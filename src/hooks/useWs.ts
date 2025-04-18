import SocketConnect from "@/ws";
import { useEffect, useRef, useState } from "react";

export function useWs() {
  const wsRef = useRef<SocketConnect | null>(null);
  const [ws, setWs] = useState<SocketConnect | null>(null);

  useEffect(() => {
    if (!wsRef.current) {
      console.log("新建一个ws");
      wsRef.current = new SocketConnect("ws://localhost:1024");
      setWs(wsRef.current);
    } else {
      setWs(wsRef.current);
    }
  }, []);

  return ws;
}
