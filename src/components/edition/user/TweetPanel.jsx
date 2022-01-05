import React from 'react'
import { TabPanel } from '@mui/lab'
import Tweet from '../../Tweet'
import { Masonry } from '@mui/lab';

export default function TweetPanel({ isLoading, tweets }) {

    if (!isLoading && Object.keys(tweets).length === 0) {

        return (
            <TabPanel value='tweetsPanel' index={0}>
                0
            </TabPanel>
        )
    }

    else {
        return (
            <TabPanel value='tweetsPanel' index={0}>
                {isLoading ? 'Loading...' :
                    <Masonry
                    sx={{m: 0}}
                    columns={{ sm: 1, md: 2}}
                    spacing={2}
                    variant="quilted"
                    cols={2}
                    defaultHeight={500}
                    defaultColumns={2}
                    defaultSpacing={2}>
                        {tweets?.data?.map((tweet, index) => <Tweet key={index} data={tweet} includes={tweets?.includes} />)}
                    </Masonry>}
            </TabPanel>
        )
    }
}
