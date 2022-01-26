import { useState} from 'react'
import Sidebar from './Sidebar'
import {Box, BottomNavigation, BottomNavigationAction} from '@mui/material'
import HomeIcon from './icons/HomeIcon'
import EditionIcon from './icons/EditionIcon'
import ProfileIcon from './icons/ProfileIcon'
import useWindowDimensions from '../hooks/useWindowDimensions'
import NextLinkComposed from './NextLinkComposed'
import { useRouter } from 'next/router';


export default function Layout({ children }) {

    const { width } = useWindowDimensions()

    const router = useRouter()

    if ( width <= 800 ) {
        return (
            <>
            <main>
                {children}
            </main>
            <BottomNavigation
        showLabels
        sx = {{position: 'fixed', bottom: 0, width: '100%', borderTop: '1px solid', borderColor: 'divider'}} 
        elevation={2}
        value={router.pathname}
      >
        <BottomNavigationAction label="Home" value="/home" icon={<HomeIcon />} component={NextLinkComposed} to={{pathname: '/home'}}/>
        <BottomNavigationAction label="Edition" icon={<EditionIcon />} />
        <BottomNavigationAction label="Profile" value="/profile" icon={<ProfileIcon />}component={NextLinkComposed} to={{pathname: '/profile'}} />
      </BottomNavigation>
            </>
        )
    }
    
    else {
        return (
            <>
            <Sidebar />
            <main>
                <Box sx={{ml: '200px'}}>
                {children}
                </Box>
            </main>
            </>
    
        )
    }
}