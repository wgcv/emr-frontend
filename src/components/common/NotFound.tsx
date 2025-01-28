import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
export const NotFound = () => {
    const navigate = useNavigate()

    return (
        <Container maxWidth="md">
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                <ThemeToggle />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h1" color="primary" sx={{ mb: 2 }}>
                    404
                </Typography>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Page Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    The page you're looking for doesn't exist or has been moved.
                </Typography>
                <Button variant="contained" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Box>
        </Container>
    )
}