"use client";
import { createContext, useContext } from "react";
import {
	type LivenessMessage,
	useLivenessWebsocket,
} from "~/hooks/use-liveness-websocket";

export const LivenessDataContext = createContext<LivenessMessage[]>([]);

export function LivenessDataProvider({
	children,
}: { children: React.ReactNode }) {
	const { messages } = useLivenessWebsocket();

	return (
		<LivenessDataContext.Provider value={messages}>
			{children}
		</LivenessDataContext.Provider>
	);
}

export function useLivenessData() {
	const messages = useContext(LivenessDataContext);
	return messages;
}
