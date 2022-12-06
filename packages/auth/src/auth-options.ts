import { prisma } from '@peel/db'
import { ServerClient } from 'postmark'
import { type NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

const postmark = new ServerClient(process.env.POSTMARK_SECRET as string)

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: {
    ...PrismaAdapter(prisma),
    // Override the `createUser` method to create and connect default preferences
    createUser: (data) => prisma.user.create({ data: { ...data, preferences: { create: {} } } }),
  },
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        const result = await postmark.sendEmail({
          To: identifier,
          From: `${process.env.POSTMARK_EMAIL_FROM_NAME} <${process.env.POSTMARK_EMAIL_FROM_ADDRESS}>`,
          Subject: `Log in to Peel`,
          TextBody: `Click the following link to log in:\n${url}`,
        })
        const failed = result.ErrorCode !== 0
        if (failed) throw new Error(`Email could not be sent: ${{ errorCode: result.ErrorCode, message: result.Message }}`)
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
}
