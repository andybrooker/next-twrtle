import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import HomeIcon from './icons/HomeIcon'
import EditionIcon from './icons/EditionIcon'
import ProfileIcon from './icons/ProfileIcon'
import NextLinkComposed from './NextLinkComposed'
import { useRouter } from 'next/router';
import useAuthors from '../hooks/useAuthors'
import Person from '@mui/icons-material/Person'

export default function BottomNav() {

    const router = useRouter()

    const { data, isLoading, isError } = useAuthors()


    return <BottomNavigation
        showLabels
        sx={{ position: 'fixed', bottom: 0, width: '100%', borderTop: '1px solid', borderColor: 'divider' }}
        elevation={2}
        value={router.pathname.split('/')[1]}
    >
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} component={NextLinkComposed} to={{ pathname: '/home' }} />
        <BottomNavigationAction label="Edition" icon={<EditionIcon />} value="edition" component={NextLinkComposed} to={{ pathname: `/edition/${isLoading ? 'add-authors' : data[0]?.username}` }} />
        <BottomNavigationAction label="Profile" value="profile" icon={<ProfileIcon />} component={NextLinkComposed} to={{ pathname: '/profile' }} />
    </BottomNavigation>;
}
