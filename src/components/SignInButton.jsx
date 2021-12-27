import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button } from '@mui/material';
import { signIn } from 'next-auth/react'



export default function SignInButton() {
    return (
        <Button
        sx={{px: 8, my: 2, textTransform: 'none'}}
        onClick={() => signIn("twitter")}
        variant ="contained"
        size='large'

        disableElevation
        startIcon={<TwitterIcon/>}>
            Continue with Twitter
        </Button>
    )
}
