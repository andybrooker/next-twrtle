import Sidebar from './Sidebar'
import { Box, Typography, Tabs, Tab } from '@mui/material'
import useWindowDimensions from '../hooks/useWindowDimensions'
import Image from 'next/image'
import useDate from '../hooks/useDate'
import useAuthors from '../hooks/useAuthors'
import NextLinkComposed from './NextLinkComposed'
import { useRouter } from "next/router"

export default function NestedLayout({ children }) {

    const { width } = useWindowDimensions()

    if (width <= 800) {
        return (
            <>
                <TopBar />
                {children}
            </>
        )
    }

    else {
        return (
            <>
                {children}
            </>

        )
    }
}

const TopBar = () => {

    const dt = useDate()

    return (
        <Box sx={{ width: '100%', backgroundColor: 'background.default', position: 'sticky', top: 0, boxShadow: 1, zIndex: 99 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Image src='/NavLogo.svg' alt='Twrtle Logo' width={48} height={48} />
                <Typography variant="h3" fontSize='11px' fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center' }}>The Sunday Timelines</Typography>
                <Typography variant="micro" fontSize='11px' fontWeight={300} sx={{ textAlign: 'center' }}>{dt}</Typography>
            </Box>
            <AuthorTabs />
        </Box>
    )
}

export function AuthorTabs() {

    const { data, isLoading, isError } = useAuthors()

    const router = useRouter()

    if (isError) {
        return (
            <div>Error</div>
        )
    }

    return (
        <Tabs
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Author Scrollable Tabs"
            value={router.asPath}
        >
            {data?.map(({ id, username }) => (
                        <Tab disableRipple component={NextLinkComposed} to={{pathname: `/edition/${username}`}} sx={{flex: 1, fontWeight: 400}} key={id} label={username} value={`/edition/${username}`}/>
                    )
                    )
            }
        </Tabs>
    )
}
