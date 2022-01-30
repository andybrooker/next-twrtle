import Sidebar from './Sidebar'
import {Box } from '@mui/material'
import useWindowDimensions from '../hooks/useWindowDimensions'
import BottomNav from './BottomNav'


export default function Layout({ children }) {

    const { width } = useWindowDimensions()

    if ( width <= 800 ) {
        return (
            <>
            <main>
                {children}
            </main>
            <BottomNav />
            </>
        )
    }
    
    else {
        return (
            <>
            <Sidebar />
            <main>
                <Box sx={{ml: '200px'}}>
                {children}
                </Box>
            </main>
            </>
    
        )
    }
}