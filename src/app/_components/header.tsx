import { Heart } from "lucide-react";

export function Header() {
	return (
		<header className="text-center p-4">
			<h1 className="text-2xl font-bold mb-2 flex items-center justify-center">
				<Heart className="w-6 h-6 mr-2" />
				hibernated-bear-liveness
				<Heart className="w-6 h-6 ml-2" />
			</h1>
		</header>
	);
}
