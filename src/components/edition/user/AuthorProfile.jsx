import { useRouter } from 'next/router'
import React from 'react'
import useTwitterUser from '../../../hooks/useTwitterUser'
import { Avatar, Skeleton, Typography, Box, Link, Button } from '@mui/material'
import { useTheme } from "@mui/material/styles"

export default function AuthorProfile() {

    const router = useRouter()
    const { author } = router.query

    const { data, isLoading, isError } = useTwitterUser(author)

    if (isError) {
        return (
            <>Error...</>
        )     
    }

    return (
        <>
        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
        <AuthorProfileImage author={data} isLoading={isLoading}/>
        <Box>
            <AuthorName author={data} isLoading={isLoading}/>
            <AuthorUsername author={data} isLoading={isLoading}/>
        </Box>
        </Box>
        </>
        )
}

const AuthorProfileImage = ({ author, isLoading }) => {

    if (isLoading) {
        return <Skeleton animation="wave" width={80} height={80} variant="circular"/>
    } else {
        return (
            <Avatar 
            sx={{width: 80, height: 80}}
            alt={author?.name} 
            src={author?.profile_image_url.replace('_normal', '')}/>
        )
    }

}

const AuthorName = ({ author, isLoading }) => {

        return (
            <Typography variant="h3" component="h1">
                {isLoading ? 
                <Skeleton animation="wave" />
                : 
                author?.name}
            </Typography>
        )

}

const AuthorUsername = ({ author, isLoading }) => {

        const theme = useTheme()

        return (
            <Typography 
            sx={{
                "&:hover": {
                    color: theme.palette.primary.main
                },
                fontWeight: 300}} 
            component="a">
                {isLoading ? 
                (<Skeleton width={150} animation="wave" />)
                : 
                (<Link 
                target="_blank"
                rel="nooponer"
                color="inherit"
                underline= "none"
                href={`https://twitter.com/${author.username}`}>@{author?.username}</Link>)}
            </Typography>
        )
}
