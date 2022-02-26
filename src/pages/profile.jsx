import React from 'react'
import { signOut } from "next-auth/react"
import { Box, Button, Drawer } from '@mui/material'
import ProfileAuthors from '../components/ProfileAuthors'


export default function Profile() {

    const drawerWidth = 200

    return (
        <Box sx={{ display: 'flex', m: 4 }}>
            <Box>
            <Button 
            variant="contained"
            disableElevation
            onClick={() => signOut({
                callbackUrl: '/'
            })}>Log Out</Button>
            <ProfileAuthors />
            </Box>
        </Box>
    )
}

Profile.auth = true