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
  threads: Array<Array<string>>,
  tweets: Array<string>
}

const handler = nextConnect()

handler.use(checkSession())
handler.use(getToken())
handler.use(createTwitter())
handler.use(getUserTweets())

handler.get(async (req: ExtendedRequest, res: NextApiResponse) => {
  
  const [threads, tweets] = await Promise.all([getThreads(req), getTweets(req)])

  res.status(200).send({
    threads: threads,
    tweets: tweets
  })

});

function getThreads(req: ExtendedRequest) {

  const threadResponse = {}
  const threadObject = Object.values(req.threads)

  const result = Promise.all(threadObject.map(async (threadArray, index) => {
    const ids = threadArray.join()
    const response = await req.twitter.v2.tweets(ids, {
      'expansions': 'attachments.media_keys,author_id,referenced_tweets.id,referenced_tweets.id.author_id',
      'media.fields': 'preview_image_url,url,type',
      'tweet.fields': 'created_at,public_metrics,entities,author_id,conversation_id,referenced_tweets,attachments',
      'user.fields': 'profile_image_url'
    })

    threadResponse[index] = response

  })).then(() => {
    return threadResponse
  })

  return result

}

async function getTweets(req: ExtendedRequest) {

  const tweet_ids = req.tweets.join()

  if (tweet_ids) {
    let { data, includes } = await req.twitter.v2.tweets(tweet_ids, {
      'expansions': ['attachments.media_keys', 'author_id','referenced_tweets.id', 'referenced_tweets.id.author_id'],
      'media.fields': ['preview_image_url', 'url', 'type'],
      'tweet.fields': 'created_at,public_metrics,entities,author_id,conversation_id,referenced_tweets,attachments',
      'user.fields': 'profile_image_url'
    })
  
    const publicMetricReducer = (obj: TweetV2['public_metrics']) => {
      const total = Object.values(obj).reduce((t, n) => t + n)
      return total
    }
  
    data = data.sort((a, b) => publicMetricReducer(b.public_metrics) - publicMetricReducer(a.public_metrics))
  
    return { data: data, includes: includes}
  } else {
    return {}
  }

}


export default handler

