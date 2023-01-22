import nextConnect from 'next-connect'
import checkSession from '../../../../utils/checkSession'
import getToken from '../../../../utils/getToken'
import createTwitter from '../../../../utils/createTwitter'
import { NextApiRequest, NextApiResponse } from 'next'
import type { TwitterApi } from 'twitter-api-v2'
import { redis } from '../../../../lib/clients/redis'


const handler = nextConnect()

interface ExtendedRequest extends NextApiRequest {
    twitter: TwitterApi
}

handler.use(checkSession())
handler.use(getToken())
handler.use(createTwitter())

handler.get(async (req: ExtendedRequest, res: NextApiResponse) => {

    let { username } = req.query

    if (Array.isArray(username)) {
        username = username.join('')
    }

    try {
        
        const response = await redis.get(username)

        if (response) {

            res.setHeader("X-Cache", "HIT");
            res.status(200).send(
                JSON.parse(response)
            )

        } else {

            const { data } = await req.twitter.v2.userByUsername(username, { 'user.fields': ['profile_image_url', 'description', 'entities'] })

            redis.psetex(username, 600000, JSON.stringify(data))

            res.setHeader("X-Cache", "MISS");
            res.status(200).send(
                data
            )

        }


    } catch (err) {
        res.status(500).json({ error: err.message})
    }


});

export default handler

