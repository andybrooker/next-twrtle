import { useSession } from 'next-auth/react'
import { Avatar, Box, ListItem, ListItemText } from '@mui/material'
import SidebarListItem from './SidebarListItem'
import React from 'react'


export default function UserProfile() {

    const { data: session } = useSession()

    return (
        <Box sx={{ display: 'flex', p: 2, alignItems: 'center', gap: 1, position: 'sticky', bottom: 0, backgroundColor: 'background.default', boxShadow: '0px -8px 15px 5px #FFFFFF'}}>
            <Avatar src={session.user.image} alt={session.user.name} />
            <SidebarListItem href='/profile' primary='Profile'/>
        </Box>
    )
}
