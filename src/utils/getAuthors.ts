import type { NextApiRequest, NextApiResponse } from 'next'
import { TweetV2, TwitterApi as Twitter, UserV2 } from 'twitter-api-v2'
import { getExpiryDate, getStartAndEndTime } from './dateUtils';
import { redis } from '../lib/clients/redis';
import util from "util"

interface ExtendedRequest extends NextApiRequest {
  data: TweetV2[],
  twitter: Twitter,
  authors: {
    id: number,
    username: string
  }[],
  token: {
    twitter: {
      token: string,
      secret: string
    }
  }
}

export default function getAuthors() {
  return async (req: ExtendedRequest, res: NextApiResponse, next) => {

    const authors = req.authors

    try {

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
      res.status(500).json({ error: err });
    }

  }
}
