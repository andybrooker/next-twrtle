import type { NextApiRequest, NextApiResponse } from 'next'
import { TweetV2, TwitterApi as Twitter } from 'twitter-api-v2'
import { getExpiryDate, getStartAndEndTime } from './dateUtils';
import { redis } from '../lib/clients/redis';
import util from "util"

interface ExtendedRequest extends NextApiRequest {
    data: TweetV2[],
    twitter: Twitter,
    threads: Array<Array<string>>,
    tweets: Array<string>,
    token: {
        twitter: {
            token: string,
            secret: string
        }
    }
}

export default function getUserTweets() {
    return async (req: ExtendedRequest, res: NextApiResponse, next) => {

        const { startTime, endTime } = getStartAndEndTime();
        const expiryMS = getExpiryDate()

        let { username } = req.query
        const searchKey = `edition/${username}`

        if (Array.isArray(username)) {
            username = username.join('')
        }

        try {

          const user = await redis.get(username)
          let id: string

          if (user) {

            id = JSON.parse(user).id

          } else {

            const { data } = await req.twitter.v2.userByUsername(username)

            id = data?.id

          }

          const response = await redis.get(searchKey)

          if (response) {

            const { threads, tweets } = JSON.parse(response)

            req.threads = threads
            req.tweets = tweets
            res.setHeader("X-Cache", "HIT")
            next()

          } else {

            const { data: { data } } = await req.twitter.v2.userTimeline(id, { 
              'tweet.fields': 'public_metrics,conversation_id,created_at', 
              'max_results': '100', 
              'exclude': ['retweets', 'replies'],
              'start_time': `${startTime}Z`, 
              'end_time': `${endTime}Z` })

            const filteredResponse = filterTweets(data)

            const tweet_ids = JSON.stringify(filteredResponse)

            redis.psetex(searchKey, expiryMS, tweet_ids)

            req.threads = filteredResponse.threads
            req.tweets = filteredResponse.tweets
            res.setHeader("X-Cache", "MISS")
            next()

          }

        } catch (err) {
          res.status(500).json({ error: err});
        }

        

        

        

        
    }
}

const filterTweets = (data: TweetV2[]) => {

    //Set empty filtered object to sort threads and solo tweets
    const filtered = { threads: [], tweets: [] }
  
    if (data) {
  
      //Create new set (more efficient), where each unique conversation_id is found)
      const convIDs = Array.from(new Set(data.map(item => item.conversation_id)));
      //Cycle through each unique conversation_id
      for (const id of convIDs) {
        //Filter tweets by conversation, 
        const array = data.reduce((ids, item) => {
          if (item.conversation_id === id) {
            ids.push(item.id)
          }
          return ids
        }, []).reverse()
        array.length > 1 ? filtered.threads.push(array) : filtered.tweets.push(array[0])
      }
    }
  
    return filtered
  }
  