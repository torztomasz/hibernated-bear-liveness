"use client";
import { type LivenessMessage } from "~/hooks/use-liveness-websocket";
import { useLivenessData } from "./liveness-data-context";

export function LastTransactions() {
	const messages = useLivenessData();
	const latestMessages = messages.slice(-10);
	return (
		<div>
			<h2 className="font-mono text-2xl font-bold uppercase">
				Last transactions
			</h2>
			{latestMessages.map((message) => (
				<Message key={message.timestamp} message={message} />
			))}
		</div>
	);
}

function Message({ message }: { message: LivenessMessage }) {
	return (
		<div className="w-max space-y-2 rounded-lg p-4">
			<div className="flex items-center gap-2">
				<span className="font-medium text-gray-500">Timestamp:</span>
				<span className="font-mono">
					{new Date(message.timestamp).toLocaleString()}
				</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="font-medium text-gray-500">Project ID:</span>
				<span className="font-mono">{message.projectId}</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="font-medium text-gray-500">Type:</span>
				<span className="font-mono">{message.type}</span>
			</div>
		</div>
	);
}
