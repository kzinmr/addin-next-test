import { nanoid } from "@/lib/utils";
import { Chat } from "@/components/chat";

export const runtime =
  process.env.NODE_ENV === "production" ? "edge" : "nodejs";

export default function IndexPage() {
  const id = nanoid();

  return <Chat id={id} />;
}
