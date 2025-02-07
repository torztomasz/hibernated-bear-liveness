// hooks/use-websocket.ts
import { useEffect, useRef, useState } from "react";
import { z } from "zod";

export const LivenessMessage = z.object({
  timestamp: z.number(),
  projectId: z.string(),
  type: z.enum(["batch-submission", "state-update"]),
});
export type LivenessMessage = z.infer<typeof LivenessMessage>;

export const useLivenessWebsocket = (url: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<LivenessMessage[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      const data = LivenessMessage.parse(JSON.parse(event.data as string));
      setMessages((prev) => [...prev, data]);
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  };

  return { isConnected, messages, sendMessage };
};
