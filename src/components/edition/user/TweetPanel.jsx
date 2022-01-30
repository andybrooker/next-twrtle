
import React from 'react'
import { Grid } from '@mui/material';
import { TabPanel, Masonry } from '@mui/lab'
import Tweet from '../../Tweet'
import SkeletonTweetCard from '../../skeletons/SkeletonTweetCard';

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
            <TabPanel value='tweetsPanel' index={0} sx={{px: 0, py: 3, width: '100%'}}>
                {isLoading ? 
                
                <Grid sx={{ m: 0}}
                columns={{ xs: 12, sm: 12, md: 12 }} container columnSpacing={1}>
                    {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={12} sm={12} md={6} key={index}>
                    <SkeletonTweetCard />
                </Grid>
                ))}
            </Grid>
                    :
                    
                    <Masonry
                    sx={{m: 0, width: '100%'}}
                    columns={{ sm: 1, md: 2}}
                    spacing={2}
                    variant="quilted"
                    cols={2}
                    defaultHeight={500}
                    defaultColumns={2}
                    defaultSpacing={2}
                    >
                        {tweets?.data?.map((tweet, index) => <Tweet key={index} data={tweet} includes={tweets?.includes} />)}
                    </Masonry>
                }
            </TabPanel>
        )
    }
}
