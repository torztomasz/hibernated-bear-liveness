import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "~/components/ui/badge";
import { type LivenessMessage } from "~/hooks/use-liveness-websocket";

export type TableEntry = {
	id: string;
	data: Record<
		LivenessMessage["type"],
		{ max: number; min: number; avg: number } | null
	>;
};

const columnHelper = createColumnHelper<TableEntry>();

export const columns = [
	columnHelper.display({
		header: "id",
		cell: (ctx) => <span className="whitespace-pre">{ctx.row.original.id}</span>,
	}),
	columnHelper.group({
		header: "batch-submissions",
		columns: [
			columnHelper.accessor("data.batch-submission.min", {
				header: "min",
				cell: (ctx) => {
					const value = ctx.row.original.data["batch-submission"]?.min;
					if (!value) {
						return <Badge variant="outline" className="border-red-500 text-white">not-enough-data</Badge>;
					}
					return <span>{value.toFixed(2)}</span>;
				},
			}),
			columnHelper.accessor("data.batch-submission.avg", {
				header: "avg",
				cell: (ctx) => {
					const value = ctx.row.original.data["batch-submission"]?.avg;
					if (!value) {
						return <Badge variant="outline" className="border-red-500 text-white">not-enough-data</Badge>;
					}
					return <span>{value.toFixed(2)}</span>;
				},
			}),
			columnHelper.accessor("data.batch-submission.max", {
				header: "max",
				cell: (ctx) => {
					const value = ctx.row.original.data["batch-submission"]?.max;
					if (!value) {
						return <Badge variant="outline" className="border-red-500 text-white">not-enough-data</Badge>;
					}
					return <span>{value.toFixed(2)}</span>;
				},
			}),
		],
	}),
	columnHelper.group({
		header: "state-updates",
		columns: [
			columnHelper.accessor("data.state-update.min", {
				header: "min",
				cell: (ctx) => {
					const value = ctx.row.original.data["batch-submission"]?.min;
					if (!value) {
						return <Badge variant="outline" className="border-red-500 text-white">not-enough-data</Badge>;
					}
					return <span>{value.toFixed(2)}</span>;
				},
			}),
			columnHelper.accessor("data.state-update.avg", {
				header: "avg",
				cell: (ctx) => {
					const value = ctx.row.original.data["state-update"]?.avg;
					if (!value) {
						return <Badge variant="outline" className="border-red-500 text-white">not-enough-data</Badge>;
					}
					return <span>{value.toFixed(2)}</span>;
				},
			}),
			columnHelper.accessor("data.state-update.max", {
				header: "max",
				cell: (ctx) => {
					const value = ctx.row.original.data["state-update"]?.max;
					if (!value) {
						return <Badge variant="outline" className="border-red-500 text-white">not-enough-data</Badge>;
					}
					return <span>{value.toFixed(2)}</span>;
				},
			}),
		],
	}),
];
