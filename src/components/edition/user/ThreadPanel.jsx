import React from 'react'
import { TabPanel } from '@mui/lab'
import Tweet from '../../Tweet'
import Thread from './Thread'

export default function ThreadPanel({isLoading, data}) {
    return (
        <TabPanel value='threadsPanel' index={0}>
            {isLoading ? 'Loading...' : Object.values(data?.threads).map((thread, index) => <Thread key={index} data={thread?.data} includes={thread?.includes}/>)}
        </TabPanel>
    )
}
