// hooks/use-websocket.ts
import { useEffect, useRef, useState } from "react";
import { z } from "zod";

export const LivenessMessage = z.object({
	timestamp: z.number(),
	projectId: z.string(),
	type: z.enum(["batch-submission", "state-update"]),
});
export type LivenessMessage = z.infer<typeof LivenessMessage>;

export const useLivenessWebsocket = () => {
	const [isConnected, setIsConnected] = useState(false);
	const [messages, setMessages] = useState<LivenessMessage[]>([]);
	const ws = useRef<WebSocket | null>(null);
	const reconnectTimeout = useRef<NodeJS.Timeout>();

	useEffect(() => {
		function connect() {
			ws.current = new WebSocket("ws://localhost:3001");

			ws.current.onopen = () => {
				console.log("Connected to WebSocket");
				setIsConnected(true);
				// Clear any pending reconnect timeouts
				if (reconnectTimeout.current) {
					clearTimeout(reconnectTimeout.current);
					reconnectTimeout.current = undefined;
				}
			};

			ws.current.onmessage = (event) => {
				const json: unknown = JSON.parse(event.data as string);
				const data = LivenessMessage.parse(json);
				setMessages((prevMessages) => [...prevMessages, data]);
			};

			ws.current.onclose = () => {
				console.log("Disconnected from WebSocket");
				setIsConnected(false);
				// Schedule reconnect
				reconnectTimeout.current = setTimeout(() => {
					console.log("Attempting to reconnect...");
					connect();
				}, 5000);
			};
		}

		connect();

		return () => {
			if (reconnectTimeout.current) {
				clearTimeout(reconnectTimeout.current);
			}
			ws.current?.close();
		};
	}, []);

	const sendMessage = (message: string) => {
		if (ws.current?.readyState === WebSocket.OPEN) {
			ws.current.send(message);
		}
	};

	return { isConnected, messages, sendMessage };
};
