import { options } from "@/app/api/auth/auth_options";
import NextAuth from "next-auth";

export const runtime =
  process.env.NODE_ENV === "production" ? "edge" : "nodejs";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
