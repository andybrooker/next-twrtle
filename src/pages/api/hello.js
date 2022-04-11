// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../lib/clients/prisma";
import { getSession } from "next-auth/react";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const session = await getSession({ req });

  const account = await prisma.account.findUnique({
    where: {
      provider_userId: {
        provider: "twitter",
        userId: session.user.id,
      },
    },
  });

  res.send(JSON.stringify(session, null, 2));
}
