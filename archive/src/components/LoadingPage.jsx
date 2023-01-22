import React from 'react'
import {Container, CircularProgress} from '@mui/material'

export default function LoadingPage() {
    return (
            <Container sx={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress />
            </Container>
    )
}
