import { useRouter } from 'next/router'
import React, { useState } from 'react'
import AuthorProfile from '../../components/edition/user/AuthorProfile'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Content from '../../components/edition/user/Content'

import useDate from '../../hooks/useDate'


export default function Author() {

    const router = useRouter()

    const dt = useDate()

    return (
        <div>
            <Box sx={{ p: 8, pb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', rowGap: 2}}>
                <AuthorProfile />
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 500, textAlign: 'right' }} variant="h3">The Sunday Timelines</Typography>
                    <Typography sx={{ textAlign: 'right', fontWeight: 300 }} component="time">{dt}</Typography>
                </Box>
            </Box>
            <Content />
        </div>

    )
}

Author.auth = true