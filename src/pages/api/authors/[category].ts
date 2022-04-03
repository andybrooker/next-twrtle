// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from "next-connect";
import checkSession from "../../../utils/checkSession";
import { prisma } from "../../../lib/clients/prisma";
import getToken from '../../../utils/getToken'
import createTwitter from '../../../utils/createTwitter'
import getAuthors from '../../../utils/getAuthors'
import { NextApiRequest, NextApiResponse } from 'next'
import type { TwitterApi } from 'twitter-api-v2'
import { Author } from "@prisma/client";

interface ExtendedRequest extends NextApiRequest {
  twitter: TwitterApi,
  authors: Author[]
}

const handler = nextConnect();

handler.use(checkSession())
handler.use(getToken())
handler.use(createTwitter())

handler.get(async (req: ExtendedRequest, res: NextApiResponse, next) => {

  let { category } = req.query;

  const tsquerySpecialChars = /[-'"()|&:*!]/g;
  const getQueryFromSearchPhrase = (category) =>
    category.replace(tsquerySpecialChars, "").trim();

  const query = getQueryFromSearchPhrase(category);

  try {

    const authors = await prisma.author.findMany({
      where: {
        categories: {
          some: {
            category: {
              equals: query
            }
          }
        }
      }
    })

    req.authors = authors
    next()


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

handler.use(getAuthors())

export default handler;
