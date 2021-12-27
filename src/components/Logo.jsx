import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image'
import { IconButton } from '@mui/material'

export default function Logo() {

    const router = useRouter()

    return (
        <IconButton 
        sx={{width: 64, height: 64, m: 2}}
        onClick={() => {
            router.push('/edition')
        }}>
                    <Image src='/NavLogo.svg' alt='Twrtle Logo' width={48} height={48}/>
        </IconButton>
    )
}
