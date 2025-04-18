import { useCallback, useEffect, useState } from "react";
import { Thread } from "./thread";
// import { deliverMessage } from "./action";
import { faker } from "@faker-js/faker";
import { useWs } from "@/hooks/useWs";

const historyMessages = new Array(10).fill(0).map((_, index) => ({
  text: faker.lorem.sentence(),
  sending: false,
  key: index + 1,
  isError: false,
}));

export default function App() {
  const [messages, setMessages] = useState(historyMessages);
  const ws = useWs();

  useEffect(() => {
    ws?.onObserve((data) => {
      if (typeof data === "string") {
        setMessages((messages) => [
          ...messages,
          {
            key: messages.length + 1,
            text: data,
            sending: false,
            isError: false,
          },
        ]);
      }
    });
  }, [ws]);

  const deliverMessage = useCallback(
    async (msg: string) => {
      console.log("ws????", ws);
      ws?.send(msg);
    },
    [ws]
  );
  async function sendMessage(formData: FormData) {
    const message = formData.get("message");
    if (typeof message === "string") {
      try {
        await deliverMessage(message);
        setMessages((messages) => [
          ...messages,
          {
            text: message,
            sending: false,
            key: messages.length + 1,
            isError: false,
          },
        ]);
      } catch (e) {
        console.error(e);
        setMessages((messages) => [
          ...messages,
          {
            text: message,
            sending: false,
            key: messages.length + 1,
            isError: true,
          },
        ]);
      }
    } else {
      console.error("Message is not a string");
    }
  }
  return <Thread messages={messages} sendMessage={sendMessage} />;
}
