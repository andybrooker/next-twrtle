import React from 'react'
import { signOut } from "next-auth/react"
import { Box, Button, Drawer } from '@mui/material'
import UserProfile from '../components/UserProfile'
import Sidebar from '../components/Sidebar'

export default function Profile() {

    const drawerWidth = 200

    return (
        <Box sx={{ display: 'flex' }}>
            <Box>
            <Button 
            variant="contained"
            disableElevation
            onClick={() => signOut({
                callbackUrl: '/'
            })}>Log Out</Button>
            </Box>
        </Box>
    )
}

Profile.auth = true