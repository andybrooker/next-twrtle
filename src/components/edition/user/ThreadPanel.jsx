import React from 'react'
import { TabPanel } from '@mui/lab'
import Tweet from '../../Tweet'

export default function ThreadPanel({isLoading, data}) {
    return (
        <TabPanel isLoading={isLoading} data={data?.tweets} value='threadsPanel' index={0}>
            {isLoading ? 'Loading...' : Object.values(data?.threads).map((thread, index) => <Tweet key={index} data={thread?.data[0]}/>)}
        </TabPanel>
    )
}
