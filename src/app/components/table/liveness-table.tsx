"use client";
import { flexRender, getCoreRowModel } from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { groupBy } from "lodash";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { type LivenessMessage } from "~/hooks/use-liveness-websocket";
import { useLivenessData } from "../liveness-data-context";
import { type TableEntry, columns } from "./columns";

export function LivenessTable() {
	const data = useLivenessData();
	const transformedData = transformData(data);
	const table = useReactTable({
		data: transformedData,
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							);
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && "selected"}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={columns.length} className="h-24 text-center">
							No results.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

function transformData(data: LivenessMessage[]) {
	const projectData = groupBy(data, (e) => e.projectId);
	const groupedData = Object.fromEntries(
		Object.entries(projectData).map(([id, data]) => {
			return [id, groupBy(data, (e) => e.type)];
		}),
	);
	const x = Object.entries(groupedData).map(([id, data]) => {
		const stats = Object.fromEntries(
			Object.entries(data).map(([type, data]) => {
				const timestamps = data.map((d) => d.timestamp).sort((a, b) => a - b);
				if (timestamps.length < 2) {
					return [type, null];
				}
				const differences = timestamps.slice(1).map(
					(t, i) => (t - timestamps[i]!) / 1000, // Convert to seconds
				);

				return [
					type,
					{
						maxInterval: Math.max(...differences),
						minInterval: Math.min(...differences),
						avgInterval:
							differences.reduce((a, b) => a + b, 0) / differences.length,
					},
				];
			}),
		);
		return { id: id, data: stats };
	}) as TableEntry[];
	return x;
}
