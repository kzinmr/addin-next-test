import { headers } from 'next/headers'
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { options } from "@/app/api/auth/auth_options";
import { TaskPaneLoginButton } from "@/components/taskpane-login-button";

export default async function SignInPage() {
  // get server-side generated redirect URL
  const headersList = headers()
  const hostname = headersList.get('host');
  if (!hostname) {
    throw new Error("Could not get hostname from server request header");
  }

  const session = await getServerSession(options);
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <TaskPaneLoginButton hostname={hostname}/>
    </div>
  );
}
