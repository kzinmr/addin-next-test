import { getServerSession } from "next-auth/next";

import { options } from "@/app/api/auth/auth_options";
import { redirect } from "next/navigation";
import { LoginButton } from "@/components/login-button";

export default async function SignInPage() {
  const session = await getServerSession(options);
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <LoginButton />
    </div>
  );
}
