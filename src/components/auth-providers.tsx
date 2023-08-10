"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function AuthProviders({ children, ...props }: Props) {
  return <SessionProvider {...props}>{children}</SessionProvider>;
}
