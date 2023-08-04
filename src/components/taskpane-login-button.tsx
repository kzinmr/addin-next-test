"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { IconGitHub, IconSpinner } from "@/components/ui/icons";

type receivedMessage =
  | { message: string; origin: string | undefined }
  | { error: number };

function launchSignInDialog(redirectUrl: string) {
  // console.log('Launching dialog... redirect URL is ', redirectUrl);
  Office.context.ui.displayDialogAsync(
    redirectUrl,
    { height: 60, width: 30 },
    (result) => {
      // console.log("Dialog has initialized. Wiring up events");
      const loginDialog = result.value;
      loginDialog.addEventHandler(
        Office.EventType.DialogMessageReceived,
        async (arg: receivedMessage) => {
          if ("message" in arg) {
            let messageFromDialog = JSON.parse(arg.message);
            if (loginDialog && messageFromDialog.status === "success") {
              // const userId = messageFromDialog.result;
              // console.log('Sign-in sucess! closing dialog');
              loginDialog.close();
            } else {
              // Something went wrong with auth(n/z) of the web application.
              if (messageFromDialog.error) {
                console.error(messageFromDialog.error);
              } else {
                console.error(messageFromDialog.result);
              }
            }
          }
        }
      );
    }
  );
}

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean;
  text?: string;
  hostname?: string;
}

export function TaskPaneLoginButton({
    text = "Login with GitHub",
    showGithubIcon = true,
    hostname = "localhost:3000",
    className,
    ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Office.onReady(() => {
      // console.log('office loaded');
    });
  }, []);
  const redirectUrl = `https://${hostname}/taskpane/sign-in`;
  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true);
        launchSignInDialog(redirectUrl);
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
