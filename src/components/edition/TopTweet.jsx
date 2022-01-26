import React, { useState, useEffect } from 'react'
import { Box, Tabs, Tab, Card, Avatar, Typography, useTheme, Link, Skeleton, Icon} from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter';
import { TweetContent } from '../Tweet'
import SkeletonTweet from '../skeletons/SkeletonTweet';


export default function TopTweet({authorQuery, tweetQuery}) {

    const {data, isLoading} = tweetQuery

    if (isLoading) {
        return (
            <Card elevation={4} sx={{
                display: 'flex', flexDirection: 'column', rowGap: 2, p: 2, height: '100%', width: '100%',
                boxSizing: 'border-box',
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)' }}>
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <AuthorProfile authorQuery={authorQuery}/>
                <TwitterIcon color='primary' fontSize='large'/>
            </Box>
                <SkeletonTweet/>
            </Card>
        )
    }

    return (
        <Card elevation={4} sx={{
            display: 'flex', flexDirection: 'column', rowGap: 2, p: 2, height: '100%', width: '100%',
            boxSizing: 'border-box',
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)' }}>
            <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <AuthorProfile authorQuery={authorQuery}/>
                <TwitterIcon color='primary' fontSize='large'/>
            </Box>
            <TweetContent data={data?.tweets?.data[0]} includes={data?.tweets?.includes} />
        </Card>
    )
}

export function AuthorProfile({authorQuery}) {

    const {data, isLoading, isError } = authorQuery

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
        return <Skeleton animation="wave" width={40} height={40} variant="circular"/>
    } else {
        return (
            <Avatar 
            sx={{width: 40, height: 40}}
            alt={author?.name} 
            src={author?.profile_image_url.replace('_normal', '')}/>
        )
    }

}

const AuthorName = ({ author, isLoading }) => {

        return (
            <Typography sx={{fontWeight: 400, m:0,p:0, lineHeight: 1}} variant="medium" component="p">
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
                fontWeight: 300
                }} 
            variant="small"
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
