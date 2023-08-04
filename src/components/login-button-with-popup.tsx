"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { IconSpinner } from "@/components/ui/icons";
import { redirect } from "next/navigation";

type receivedMessage =
  | { message: string; origin: string | undefined }
  | { error: number };

function launchSignInDialog(
  redirectUrl: string,
  setIsPopupClosed: (isClosed: boolean) => void
) {
  // console.log('Launching dialog... redirect URL is ', redirectUrl);
  Office.context.ui.displayDialogAsync(
    redirectUrl,
    { height: 60, width: 30 },
    (result) => {
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
              setIsPopupClosed(true);
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
  onStateChange?: (isLoading: boolean) => void;
}

export function LoginButtonWithPopup({
  text = "Log in to Add-In",
  hostname = "localhost:3000",
  className,
  onStateChange,
  ...props
}: LoginButtonProps) {
  useEffect(() => {
    Office.onReady(() => {
      // console.log('office loaded');
    });
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  // State management for re-rendering parent component
  // in order to update the session of a parent Server Component.
  const [isPopupClosed, setIsPopupClosed] = useState(false);
  useEffect(() => {
    if (isPopupClosed) {
      // console.log('Popup is closed, then refreshing the page');
      redirect("/taskpane");
    }
  }, [isPopupClosed]);

  const redirectUrl = `https://${hostname}/taskpane/sign-in`;
  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true);
        launchSignInDialog(redirectUrl, setIsPopupClosed);
      }}
      disabled={isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : null}
      {text}
    </Button>
  );
}
