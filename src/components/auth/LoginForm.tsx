import { getActor, getToken, login } from '@/components/api/auth'
import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    styled,
    TextField,
    Typography,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: '0 auto',
}));

export const LoginForm = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })
    useEffect(() => {
        if (getToken()) {
            const actor = getActor()
            if (actor) {
                if (actor === 'staff') {
                    navigate('/staff/dashboard')
                } else if (actor === 'veterinary') {
                    navigate('/veterinary/dashboard')
                } else if (actor === 'petOwner') {
                    navigate('/pet-owner/dashboard')
                }
            }
        }
    }, [navigate])
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            const actor = data.user.actor;
            if (actor === 'staff') {
                navigate('/staff/dashboard')
            } else if (actor === 'veterinary') {
                navigate('/veterinary/dashboard')
            } else if (actor === 'petOwner') {
                navigate('/pet-owner/dashboard')
            }
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        loginMutation.mutate(credentials)
    }

    // Remove StyledPaper definition from here
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <StyledPaper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >

                    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                            error={loginMutation.isError}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={credentials.password}
                            onChange={(e) => setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                            error={loginMutation.isError}
                        />
                        {loginMutation.isError && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                Invalid credentials.
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </Box>
                </StyledPaper>
            </Box>
        </Container>
    )
}