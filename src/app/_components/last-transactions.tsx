"use client";
import { useLivenessData } from "./liveness-data-context";

export function LastTransactions() {
	const messages = useLivenessData();
	const latestMessages = [...messages.slice(-10)].sort(
		(a, b) => b.timestamp - a.timestamp,
	);
	return (
		<div className="mt-8">
			<h2 className="text-xl mb-4">recent-transactions</h2>
			<ul className="space-y-2">
				{latestMessages.map((tx, index) => (
					<li key={index} className="border border-red-500 p-2">
						<span className="mr-4">
							{new Date(tx.timestamp).toLocaleString()}
						</span>
						<span className="mr-4">{tx.projectId}</span>
						<span>{tx.type}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
