import React from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Typography } from '@mui/material'
import Greeting from '../components/edition/Greeting'



export default function Edition() {

    return (
        <Box sx={{ p: '60px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Greeting />
        </Box>
    )
}

Edition.auth = true