import React from 'react'
import { Box, Skeleton } from '@mui/material'

export default function SkeletonTweet() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
                <Box>{[0, 1, 2].map((value, index) => <Skeleton key={index} variant='text'/>)}</Box>
                <Box>
                    <Skeleton width={180} variant='text'/>
                    <Box sx={{ height: '22px' }}>
                        <Skeleton width={160} variant='text'/>
                    </Box>
                </Box>
            </Box>
    )
}
