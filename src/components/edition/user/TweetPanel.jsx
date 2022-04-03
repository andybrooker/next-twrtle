
import React from 'react'
import { Grid, useMediaQuery } from '@mui/material';
import { TabPanel } from '@mui/lab'
import Tweet from '../../Tweet'
import SkeletonTweetCard from '../../skeletons/SkeletonTweetCard';
import Masonry from 'react-masonry-css';
import styles from '../../../styles/masonry.module.css'

export default function TweetPanel({ isLoading, tweets }) {

    const extra_padding = useMediaQuery('(max-width: 600px)')

    if (!isLoading && Object.keys(tweets).length === 0) {

        return (
            <TabPanel value='tweetsPanel' index={0}>
                0
            </TabPanel>
        )
    }

    else {
        return (
            <TabPanel value='tweetsPanel' index={0} sx={{px: 0, py: 0, width: '100%'}}>
                {isLoading ? 
                
                <Grid sx={{ m: 0, ml: -4}}
                columns={{ xs: 12, sm: 12, md: 12 }} container columnSpacing={4}>
                    {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={12} sm={12} md={6} key={index}>
                    <SkeletonTweetCard />
                </Grid>
                ))}
            </Grid>
                    :
                    
                    <Masonry
                    breakpointCols={{default: 2, 1000: 1}}
                    className={styles.mymasonrygrid}
                    columnClassName={styles.mymasonrygrid_column}>
                        {tweets?.data?.map((tweet, index) => <Tweet key={index} data={tweet} includes={tweets?.includes} />)}
                    </Masonry>
                }
            </TabPanel>
        )
    }
}
