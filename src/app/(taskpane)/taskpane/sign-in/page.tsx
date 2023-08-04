"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { IconGitHub, IconSpinner } from "@/components/ui/icons";

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean;
  text?: string;
}

function LoginButtonOnTaskpane({
  text = "Login with GitHub",
  showGithubIcon = true,
  className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true);
        // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
        signIn("github", { callbackUrl: `/taskpane/sign-in` });
      }}
      disabled={isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGithubIcon ? (
        <IconGitHub className="mr-2" />
      ) : null}
      {text}
    </Button>
  );
}

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
      <LoginButtonOnTaskpane />
    </div>
  );
}
