import { useRouter } from 'next/router'
import React from 'react'
import useTwitterUser from '../../../hooks/useTwitterUser'
import { Avatar, Skeleton, Typography, Box, Link, Button, useMediaQuery } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import FollowUser from './FollowUser'

export default function AuthorProfile({ userFollows }) {

    const router = useRouter()
    const { author } = router.query

    const { data, isLoading, isError } = useTwitterUser(author)
    const useFullWidth = useMediaQuery('(max-width: 800px)')

    if (isError) {
        return (
            <>Error...</>
        )
    }

    return (
        <Box sx={{display: 'flex', width: '100%', flexDirection: 'row', columnGap: 2, alignItems: 'center', justifyContent: useFullWidth ? 'space-between' : 'flex-start'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AuthorProfileImage author={data} isLoading={isLoading} />
                <Box>
                    <AuthorName author={data} isLoading={isLoading} />
                    <AuthorUsername author={data} isLoading={isLoading} />
                </Box>
            </Box>
            <FollowUser userFollows={userFollows} author={isLoading ? {} : data} />
        </Box>
    )
}

const AuthorProfileImage = ({ author, isLoading }) => {

    if (isLoading) {
        return <Skeleton animation="wave" width={80} height={80} variant="circular" />
    } else {
        return (
            <Avatar
                sx={{ width: 80, height: 80 }}
                alt={author?.name}
                src={author?.profile_image_url.replace('_normal', '')} />
        )
    }

}

export const AuthorName = ({ author, isLoading }) => {

    return (
        <Typography variant="h3" component="h1">
            {isLoading ?
                <Skeleton animation="wave" />
                :
                author?.name}
        </Typography>
    )

}

export const AuthorUsername = ({ author, isLoading }) => {

    const theme = useTheme()

    return (
        <Typography
            sx={{
                "&:hover": {
                    color: theme.palette.primary.main
                },
                fontWeight: 300
            }}
            component="a">
            {isLoading ?
                (<Skeleton width={150} animation="wave" />)
                :
                (<Link
                    target="_blank"
                    rel="nooponer"
                    color="inherit"
                    underline="none"
                    href={`https://twitter.com/${author.username}`}>@{author?.username}</Link>)}
        </Typography>
    )
}
