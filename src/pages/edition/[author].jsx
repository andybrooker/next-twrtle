import { useRouter } from 'next/router'
import React, { useState } from 'react'
import AuthorProfile from '../../components/edition/user/AuthorProfile'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useMediaQuery } from '@mui/material'
import Layout from '../../components/layout'
import NestedLayout from '../../components/nestedlayout'

import Content from '../../components/edition/user/Content'

import useDate from '../../hooks/useDate'

export default function Author() {

    const mobile = useMediaQuery('(max-width: 800px)')
    const padding = useMediaQuery('(max-width: 600px)')

    return (
        <div>
            <Box sx={{ p: padding ? 2 : 8, pb: padding ? 2 : 4, pt: padding ? 4 : 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', rowGap: 2 }}>
                <AuthorProfile />
                {mobile ? <></> : <SundayTimelines />}
            </Box>
            <Content />
        </div>

    )
}

const SundayTimelines = () => {

    const dt = useDate()

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: '24px', fontWeight: 500, textAlign: 'right' }} variant="h3">The Sunday Timelines</Typography>
            <Typography sx={{ textAlign: 'right', fontWeight: 300 }} component="time">{dt}</Typography>
        </Box>
    )
}

Author.auth = true

Author.getLayout = function getLayout(page) {

    console.log('Testing')

    return (
        <Layout>
            <NestedLayout>
                {page}
            </NestedLayout>
        </Layout>
    )
}