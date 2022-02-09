import React, {useRef, useCallback} from 'react'
import TweetText from './TweetText'
import { TweetV2, ApiV2Includes, MediaObjectV2 } from 'twitter-api-v2'
import { Card, Box, CardMedia } from '@mui/material'
import { TweetInfo } from './TweetInfo'
import TweetMedia from './edition/user/TweetMedia'
import { toPng } from 'html-to-image';


export default function Tweet({ data, includes, isLoading }: { data: TweetV2, includes: ApiV2Includes, isLoading: boolean }) {

    return (
        <Card sx={{ my: 1, p: 2 }} variant="outlined">
            <TweetContent data={data} includes={includes} />
            <TweetInfo data={data}/>
        </Card>
    )
}

export const TweetContent = ({ data, includes }: { data: TweetV2, includes: ApiV2Includes }) => {


    //One Link Case
    if (data.entities && data.entities.urls && !data.attachments && (!data.referenced_tweets || data.referenced_tweets.find(object => object.type === 'replied_to'))) {

        data.text = data.text.replace(data.entities.urls[0].url, '')

        return (
            <>
                <Box><TweetText tweet={data} /></Box>
            </>
        )

    }

    if (data.entities && data.hasOwnProperty('attachments') && data?.attachments.hasOwnProperty('media_keys') && (!data.referenced_tweets || data.referenced_tweets.find(object => object.type === 'replied_to'))) {

        data.entities?.urls?.forEach(URL => {
            if (URL.display_url.includes('pic.twitter.com')) data.text = data.text.replace(URL.url, '');
            else data.text = data.text.replace(URL.url, URL.expanded_url)
        });


        const mks = data.attachments.media_keys;

        if (!mks) {
            console.log(data.attachments)
        }

        const isMedia = includes?.hasOwnProperty('media')

        let media_array: MediaObjectV2[]

        if (isMedia && mks) {
            const media = includes.media;
            media_array = media.filter((element) => mks.includes(element.media_key));
        }

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
                <Box sx={{ py: 1 }}><TweetText tweet={data} /></Box>
                {isMedia && <TweetMedia media={media_array} />}
            </Box>
        )

    }

    else {

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
                <Box><TweetText tweet={data} /></Box>
            </Box>

        )

    }

}