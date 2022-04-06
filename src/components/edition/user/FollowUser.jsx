import React, { useState } from 'react'
import { Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useMutation, useQueryClient } from 'react-query'
import useAuthorCheck from '../../../hooks/useAuthorCheck'
import axios from 'axios'
import { alpha, styled } from '@mui/material/styles';
import { color } from '@mui/system'

export default function FollowUser({ author, userFollows }) {

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const { data: isFollowing, isLoading } = useAuthorCheck(author.username, userFollows)

  const addAuthor = useMutation(newFollow => {
    return axios.post('/api/authors', newFollow)
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`authorcheck-${author.username}`)
        queryClient.invalidateQueries("authors")
      }
    })

  const unfollowAuthor = useMutation(removeAuthor => {
    return axios.delete('/api/authors', { data: { removeAuthor } })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`authorcheck-${author.username}`)
        queryClient.invalidateQueries("authors")
      }
    })

  return (
    <>
      {isFollowing ?
        <Following unfollowAuthor={unfollowAuthor} user={author} /> :
        <AddUser addAuthor={addAuthor} user={author} />
      }
    </>
  )
}

const AddUser = ({ addAuthor, user }) => {
  return (
    <LoadingButton loading={addAuthor.isLoading} onClick={() => { addAuthor.mutate({ id: user.id, username: user.username }) }} disableElevation size="small" sx={{width: '80px'}} variant="contained">Add +</LoadingButton>
  )
}

const Following = ({ unfollowAuthor, user }) => {

  const [content, setContent] = useState('Subscribed')

  return (
    <FollowingButton loading={unfollowAuthor.isLoading} onTouchStart={() => setContent('Unfollow')} onTouchMove={() => setContent('Subscribed')} onMouseOver={() => setContent('Unfollow')} onMouseOut={() => setContent('Subscribed')} size="small" onClick={() => { unfollowAuthor.mutate({ id: user.id }) }} variant="outlined">{content}</FollowingButton>
  )
}


const FollowingButton = styled(LoadingButton)(({ theme }) => ({
  '&.MuiLoadingButton-root': {
    width: '80px',
    '&:hover' : {
      color: theme.palette.error.light,
      borderColor: theme.palette.error.light,
      backgroundColor: alpha(theme.palette.error.light, 0.1)
    }
  },
}));

const FollowVars = {

}

const UnfollowVars = {

}

const AddVars = {

}