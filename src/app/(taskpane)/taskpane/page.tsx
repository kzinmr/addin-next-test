"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

type MyArg =
  | { message: string; origin: string | undefined }
  | { error: number };

function launchSignInDialog() {
  const redirectUrl = `https://${window.location.host}/taskpane/sign-in`;
  // console.log('Launching dialog... redirect URL is ', redirectUrl);
  Office.context.ui.displayDialogAsync(
    redirectUrl,
    { height: 60, width: 30 },
    (result) => {
      // console.log("Dialog has initialized. Wiring up events");
      const loginDialog = result.value;
      loginDialog.addEventHandler(
        Office.EventType.DialogMessageReceived,
        async (arg: MyArg) => {
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

export default function TaskPane() {
  useEffect(() => {
    Office.onReady(() => {
      // console.log('office loaded');
    });
  }, []);
  const { data: session } = useSession();
  if (session?.user) {
    // console.log('Signed-in, redirect to home')
    redirect("/");
  }
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <Button
        variant="outline"
        onClick={() => {
          setIsLoading(true);
          launchSignInDialog();
        }}
        disabled={isLoading}
      >
        sign in
      </Button>
    </div>
  );
}
