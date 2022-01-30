import React from 'react'
import {List, Drawer, ListSubheader} from '@mui/material'
import UserProfile from './UserProfile'
import AuthorsList from './AuthorsList'
import Logo from './Logo'
import SidebarListItemIcon from './SidebarListItemIcon'
import PersonSearch from '@mui/icons-material/PersonSearch'

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
                <List sx={{p: 2}}>
                    <SidebarListItemIcon href='/edition/add-authors' primary='Add Authors' icon={<PersonSearch />} />
                </List>
                <AuthorsList />
                <UserProfile/>
            </Drawer>
    )
}
