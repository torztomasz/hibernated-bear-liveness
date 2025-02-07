import { LastTransaction } from "./components/test";

export default async function Home() {
  return (
    <div className="bg-black/10">
      <h1 className="text-center font-mono text-4xl font-bold uppercase">
        Hibernated bear liveness
      </h1>
      <LastTransaction />
    </div>
  );
}
