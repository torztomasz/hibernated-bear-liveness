import { LastTransactions } from "./components/last-transactions";
import { LivenessTable } from "./components/table/liveness-table";

export default async function Home() {
	return (
		<div className="border rounded-lg p-6 space-y-8">
			<h1 className="text-center font-mono text-4xl font-bold uppercase">
				Hibernated-bear-liveness
			</h1>
			<LivenessTable />
			<LastTransactions />
		</div>
	);
}
