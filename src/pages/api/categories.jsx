// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from "next-connect";
import checkSession from "../../utils/checkSession";
import { prisma } from "../../lib/clients/prisma";

const handler = nextConnect();

handler.use(checkSession());
handler.get(async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      select: { category: true },
      orderBy: { id: "asc" },
    });

    res.status(200).send(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default handler;
