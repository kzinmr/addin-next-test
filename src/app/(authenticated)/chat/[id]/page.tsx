import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { options } from "@/app/api/auth/auth_options";
import { getChat } from "@/app/actions";
import { Chat } from "@/components/chat";

export const runtime = process.env.NODE_ENV === 'production' ? 'edge' : 'nodejs';
export const preferredRegion = "home";

export interface ChatPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ChatPageProps): Promise<Metadata> {
  const session = await getServerSession(options);

  if (!session?.user) {
    return {};
  }

  const userId = session?.user?.id;
  const chat = await getChat(params.id, userId);
  return {
    title: chat?.title.toString().slice(0, 50) ?? "Chat",
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await getServerSession(options);

  if (!session?.user) {
    redirect(`/sign-in?next=/chat/${params.id}`);
  }
  const userId = session?.user?.id;
  const chat = await getChat(params.id, userId);

  if (chat === null || chat?.userId.toString() !== userId) {
    notFound();
  }

  return <Chat id={chat.id} initialMessages={chat.messages} />;
}
