import nextConnect from 'next-connect'
import checkSession from '../../../../utils/checkSession'
import getToken from '../../../../utils/getToken'
import createTwitter from '../../../../utils/createTwitter'
import type { NextApiRequest, NextApiResponse } from 'next'
import { TweetV2, TwitterApi } from 'twitter-api-v2'
import getUserTweets from '../../../../utils/getUserTweets'


interface ExtendedRequest extends NextApiRequest {
  twitter: TwitterApi,
  data: TweetV2[],
}

const handler = nextConnect()

handler.use(checkSession())
handler.use(getToken())
handler.use(createTwitter())

handler.get(async (req: ExtendedRequest, res: NextApiResponse) => {
  
    let {id} = req.query

    if (Array.isArray(id)) {
        id = id.join('')
    }

    try {

        const { data, includes } = await req.twitter.v2.tweets(id, {
            expansions: ['attachments.media_keys'],
            'media.fields': ['preview_image_url', 'url', 'type', 'width', 'height'],
        })

        let media;
        includes && includes.hasOwnProperty("media") ? media = includes.media : media = {}
        res.status(200).send(media)

    } catch (err) {
        res.status(500).json({ error: err.message})
    }
  

});


export default handler

