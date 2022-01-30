import { useRouter } from 'next/router'
import React, { useState } from 'react'
import AuthorProfile from '../../components/edition/user/AuthorProfile'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function Author() {

    const router = useRouter()


    return (
        <div>
            <Box sx={{ p: 8, pb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Explore Page!
            </Box>
        </div>

    )
}

Author.auth = true