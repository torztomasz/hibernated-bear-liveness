import { Header } from "./_components/header";
import { LastTransactions } from "./_components/last-transactions";
import { LivenessTable } from "./_components/table/liveness-table";

export default async function Home() {
	return (
		<div className="p-4 max-w-5xl mx-auto">
			<Header />
			<main className="mt-8">
				<LivenessTable />
				<LastTransactions />
			</main>
		</div>
	);
}
