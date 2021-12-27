import React from 'react'
import Drawer from '@mui/material/Drawer'
import UserProfile from './UserProfile'
import AuthorsList from './AuthorsList'
import Logo from './Logo'

export default function Sidebar() {

    const drawerWidth = 200

    return (
        <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between'
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Logo />
                <AuthorsList />
                <UserProfile/>
            </Drawer>
    )
}
