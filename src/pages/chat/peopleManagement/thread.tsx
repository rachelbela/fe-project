import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOptimistic, useRef } from "react";

interface Props {
  messages: {
    text: string;
    sending: boolean;
    key: number;
    isError: boolean;
  }[];
  sendMessage: (formData: FormData) => Promise<void>;
}

export function Thread({ messages, sendMessage }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  async function formAction(formData: FormData): Promise<void> {
    addOptimisticMessage(formData.get("message") as string);
    formRef.current?.reset();
    await sendMessage(formData);
  }
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      {
        text: newMessage,
        sending: true,
        key: state.length + 1,
        isError: false,
      },
    ]
  );

  return (
    <>
      <div className="h-[500px] overflow-y-scroll">
        {optimisticMessages.map((message, index) => (
          <div key={index}>
            {message.text}
            {!!message.sending && <small> (Sending...)</small>}
            {message.isError && (
              <small className="text-red-600">(error...)</small>
            )}
          </div>
        ))}
      </div>

      <form action={formAction} ref={formRef}>
        <Input type="text" name="message" placeholder="请输入发送的消息" />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
}
