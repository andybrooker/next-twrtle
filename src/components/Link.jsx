import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material'

import React from 'react'

export default function Link({href, children}) {

    return (
        <NextLink href={href} passHref>
            <MUILink sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}} underline="none">{children}</MUILink>
        </NextLink>
    )
}
