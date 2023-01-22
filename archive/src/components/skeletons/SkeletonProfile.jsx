import React from 'react'
import { Skeleton, Box, Typography} from '@mui/material'
import { AuthorName, AuthorUsername } from '../edition/user/AuthorProfile'

export default function SkeletonProfile() {

    const isLoading = true
    const data = {}

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Skeleton animation="wave" width={40} height={40} variant="circular"/>
                <Box>
                <Typography sx={{fontWeight: 400, m:0,p:0, lineHeight: 1}} variant="medium" component="p">
                <Skeleton animation="wave" />
            </Typography>
            <Typography 
            variant="small"
            component="a">
                <Skeleton width={150} animation="wave" />
            </Typography>
                </Box>
            </Box>
        </>
    )
}