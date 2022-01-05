import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {useEffect} from 'react'

export default function SidebarListItem({ href, primary}) {

    const router = useRouter()

    return (
        <Link href={href} passHref>
            <ListItemButton
            sx = {{
                ph: 1,
                borderRadius: 2,
                height: 40,
                my: 1
            }}
            component="a"
            selected={href.toLowerCase() === router.asPath.toLowerCase()}>
            <ListItemText primary={primary}/>
        </ListItemButton>  
        </Link>

    )
}
