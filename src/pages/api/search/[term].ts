// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from "next-connect";
import checkSession from "../../../utils/checkSession";
import { prisma } from "../../../lib/clients/prisma";
import getToken from '../../../utils/getToken'
import createTwitter from '../../../utils/createTwitter'
import { NextApiRequest, NextApiResponse } from 'next'
import type { TwitterApi } from 'twitter-api-v2'

interface ExtendedRequest extends NextApiRequest {
  twitter: TwitterApi
}

const handler = nextConnect();

handler.use(checkSession())
handler.use(getToken())
handler.use(createTwitter())

handler.get(async (req: ExtendedRequest, res: NextApiResponse) => {

  let { term } = req.query;

  console.log(term)

  if (Array.isArray(term)) {
    term = term.join("");
  }

  const tsquerySpecialChars = /[-'"()|&:*!]/g;
  const getQueryFromSearchPhrase = (term) =>
    term.replace(tsquerySpecialChars, "").trim().concat(":*");

  const query = getQueryFromSearchPhrase(term);

  try {
    const authors = await prisma.author.findMany({
      where: {
        username: {
          search: query,
        },
      },
    });

    switch(authors.length) {
      case 0:
        res.status(200).send([])
        break;
      default:
        const usernames = authors.map((author, index) => author.username).join(',')
        const { data } = await req.twitter.v2.usersByUsernames(usernames, { 'user.fields': ['profile_image_url', 'description', 'entities'] })
        res.status(200).send(data) 
    }


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default handler;
