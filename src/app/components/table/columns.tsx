import { createColumnHelper } from "@tanstack/react-table";
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
		header: "ID",
		cell: (ctx) => ctx.row.original.id,
	}),
	columnHelper.accessor("data.batch-submission.avgInterval", {
		header: "Batch Submission",
	}),
	columnHelper.accessor("data.state-update.avgInterval", {
		header: "State Update ",
	}),
];
