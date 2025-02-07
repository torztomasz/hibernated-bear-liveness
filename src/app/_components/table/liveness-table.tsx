"use client";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
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
import { useMemo } from "react";

export function LivenessTable() {
  const data = useLivenessData();
  const transformedData = useMemo(() => transformData(data), [data]);
  const table = useReactTable({
    data: transformedData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl lowercase">liveness-stats</h2>
      <div className="border-2 border-red-500">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="border-b-2 border-red-500 lowercase text-white"
                    >
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
                    <TableCell
                      key={cell.id}
                      className="border-r border-red-500 last:border-r-0"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function transformData(data: LivenessMessage[]) {
  const projectData = groupBy(data, (e) => e.projectId);
  const groupedData = Object.fromEntries(
    Object.entries(projectData).map(([id, data]) => {
      return [id, groupBy(data, (e) => e.type)];
    }),
  );
  return Object.entries(groupedData).map(([id, data]) => {
    const stats = Object.fromEntries(
      Object.entries(data).map(([type, data]) => {
        const timestamps = data.map((d) => d.timestamp).sort((a, b) => a - b);
        const differences = timestamps.slice(1).map(
          (t, i) => (t - timestamps[i]!) / 1000, // Convert to seconds
        );
        if (differences.length === 0) {
          return [type, undefined];
        }

        return [
          type,
          {
            max: Math.max(...differences),
            min: Math.min(...differences),
            avg:
              timestamps.length > 2
                ? differences.reduce((a, b) => a + b, 0) / differences.length
                : undefined,
          },
        ];
      }),
    );
    return { id: id, data: stats };
  }) as TableEntry[];
}
