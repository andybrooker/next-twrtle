import type { NextApiRequest, NextApiResponse } from 'next'
import { TwitterApi as Twitter } from 'twitter-api-v2'

interface ExtendedRequest extends NextApiRequest {
    twitter: Twitter,
    token: {
        twitter: {
            token: string,
            secret: string
        }
    }
}

export default function createTwitter() {
    return async (req: ExtendedRequest, res: NextApiResponse, next) => {

        const client = new Twitter({
            appKey: process.env.TWITTER_CONSUMER_KEY,
            appSecret: process.env.TWITTER_CONSUMER_SECRET,
            accessToken: req.token.twitter.token,
            accessSecret: req.token.twitter.secret
        })

        req.twitter = client

        next()
    }
}