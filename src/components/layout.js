import Sidebar from './Sidebar'
import Box from '@mui/material/Box'

export default function Layout({ children }) {
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