import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV == "development",
  session: {
      strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET
})