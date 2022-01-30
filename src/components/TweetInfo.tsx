import React from 'react';
import { Box } from '@mui/material';
import Date from './Date';
import { TweetV2 } from 'twitter-api-v2'
import { Metrics } from './Metrics';
import TweetMenu from './TweetMenu'


export const TweetInfo =({ data, onDownloadImage } : { data: TweetV2, onDownloadImage: () => void})=> {

    const handleClick = () => {
        console.log('Test')
    }

    return (
        <Box sx={{mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box>
                <Date createdAt={data?.created_at} thread={false} />
                <Box sx={{ display: 'flex', fontWeight: 400, fontSize: '12px', columnGap: '6px', alignItems: 'center', color: 'text.secondary', height: '22px' }}>
                    <Metrics metrics={data?.public_metrics} />
                </Box>
            </Box>
            <TweetMenu onDownloadImage={onDownloadImage} data={data}/>
        </Box>
    )

}

