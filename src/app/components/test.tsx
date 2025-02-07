"use client";
import {
  type LivenessMessage,
  useLivenessWebsocket,
} from "~/hooks/use-websocket";

export function LastTransaction() {
  const { messages } = useLivenessWebsocket("ws://localhost:3001");
  const latestMessages = messages.splice(-10);
  return (
    <div>
      <h2 className="font-mono text-2xl font-bold uppercase">
        Last transaction
      </h2>
      {latestMessages.map((message) => (
        <Message key={message.timestamp} message={message} />
      ))}
    </div>
  );
}

function Message({ message }: { message: LivenessMessage }) {
  return (
    <div className="w-max space-y-2 rounded-lg bg-gray-50 p-4">
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
