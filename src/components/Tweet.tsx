import React, {useRef, useCallback} from 'react'
import TweetText from './TweetText'
import { TweetV2, TweetEntitiesV2, TweetEntityUrlV2, ApiV2Includes, MediaObjectV2 } from 'twitter-api-v2'
import { Card, Box, CardMedia, Typography } from '@mui/material'
import { TweetInfo } from './TweetInfo'
import TweetMedia from './edition/user/TweetMedia'
import { toPng } from 'html-to-image';
import Image from 'next/image'
import { alpha, palette } from '@mui/system'


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
    if (data?.entities?.urls?.length == 1 && !data.attachments && (!data.referenced_tweets || data.referenced_tweets.find(object => object.type === 'replied_to'))) {

        data.text = data.text.replace(data.entities.urls[0].url, '')

        return (
            <>
                <Box>
                    <TweetText tweet={data} />
                    <TweetLink entity={data?.entities?.urls[0]}/>
                </Box>
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

const TweetLink = ({entity} : { entity: TweetEntityUrlV2}) => {

    const hasPreview = entity.hasOwnProperty('title');

    return (
        <Box sx={{display: 'flex', border: '1px solid', borderColor: 'divider', borderRadius: '8px', width: '100%', height: '100px'}}>
            <Box sx={{overflow: 'hidden', borderTopLeftRadius: '7px', borderBottomLeftRadius: '7px', width: '100px', height: '100%', minWidth: '100px', position: 'relative'}}>
                <Image alt={entity.description} src={entity?.images[0].url} layout='fill' objectFit='cover' objectPosition='center'/>
            </Box>
            <Box sx={{backgroundColor: 'action.hover', borderTopRightRadius: '7px', borderBottomRightRadius: '7px', p: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                <Typography sx={{fontSize: '0.75rem', fontWeight: 400, display: '-webkit-box', WebkitBoxOrient: 'vertical',WebkitLineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis'}}>{entity.title}</Typography>
                <Typography sx={{fontSize: '0.75rem', fontWeight: 300, display: '-webkit-box', WebkitBoxOrient: 'vertical',WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis'}}>{entity.description}</Typography>
                <Typography sx={{fontSize: '0.75rem', fontWeight: 300, color: 'text.secondary'}}>{entity.display_url}</Typography>
            </Box>
        </Box>
    )

}