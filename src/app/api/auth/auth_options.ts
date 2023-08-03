import type { NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";

export const options: NextAuthOptions = {
  debug: true,
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    jwt({ token, account, profile }) {
      if (profile !== undefined && account !== null) {
        token.accessToken = account.access_token;
        token.id = account.providerAccountId;
        token.image = profile.image;
      }
      return token;
    },
    session: ({ session, token }) => {
    //   console.log("in session", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
};
