import React from 'react'
import { TabPanel } from '@mui/lab'
import Tweet from '../../Tweet'

export default function TweetPanel({isLoading, tweets}) {

    const [disabled, setDisabled] = React.useState(false)

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
                        {isLoading ? 'Loading...' : tweets?.data?.map((tweet, index) => <Tweet key={index} data={tweet} includes={tweets?.includes}/>)}
            </TabPanel>
        )
    }
}
