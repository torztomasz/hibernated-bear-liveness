import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "~/components/ui/badge";
import { type LivenessMessage } from "~/hooks/use-liveness-websocket";

export type TableEntry = {
	id: string;
	data: Record<
		LivenessMessage["type"],
		{ maxInterval: number; minInterval: number; avgInterval: number } | null
	>;
};

const columnHelper = createColumnHelper<TableEntry>();

export const columns = [
	columnHelper.display({
		header: "id",
		cell: (ctx) => ctx.row.original.id,
	}),
	columnHelper.accessor("data.batch-submission.avgInterval", {
		header: "batch-submissions",
		cell: (ctx) => {
			const value = ctx.getValue();
			if (!value) {
				return <Badge variant="outline">not-enough-data</Badge>;
			}
			return <span>{value.toFixed(2)}</span>;
		},
	}),
	columnHelper.accessor("data.state-update.avgInterval", {
		header: "state-updates",
		cell: (ctx) => {
			const value = ctx.getValue();
			if (!value) {
				return <Badge variant="outline">not-enough-data</Badge>;
			}
			return <span>{value.toFixed(2)}</span>;
		},
	}),
];
