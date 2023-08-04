"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { LoginButton } from "@/components/login-button";


export default function SignInPage() {
  useEffect(() => {
    Office.onReady(() => {
      // console.log('office loaded');
    });
  }, []);
  const { data: session } = useSession();
  if (session?.user) {
    Office.context.ui.messageParent(
      JSON.stringify({
        status: "success",
        result: session.user.id,
      })
    );
    return (
      <>
        <span>Login success! wait on...</span>
      </>
    );
  }
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <LoginButton callbackUrl={"/taskpane/sign-in"} />
    </div>
  );
}
