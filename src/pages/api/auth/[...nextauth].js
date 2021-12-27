import NextAuth from 'next-auth';
import TwitterProvider from "next-auth/providers/twitter"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '../../../lib/clients/prisma'

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CONSUMER_KEY,
            clientSecret: process.env.TWITTER_CONSUMER_SECRET
        })
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({ session, user, token }) {
            session.user.id = user.id
            return session
          }
        }
});
