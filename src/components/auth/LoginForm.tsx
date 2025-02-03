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
import { CLINIC_ROLES, PET_OWNER_ROLES, STAFF_ROLE } from '../types/User'
import { getRole, getToken, login } from './api/auth.types'
export const LoginForm = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })
    useEffect(() => {
        if (getToken()) {
            const role = getRole()
            if (role) {
                if (STAFF_ROLE.includes(role)) {
                    navigate('/staff/dashboard')
                } else if (CLINIC_ROLES.includes(role)) {
                    navigate('/veterinary/dashboard')
                } else if (PET_OWNER_ROLES.includes(role)) {
                    navigate('/pet-owner/dashboard')
                }
            }
        }
    }, [navigate])
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            const role = data.user.role;
            if (STAFF_ROLE.includes(role)) {
                navigate('/staff/dashboard')
            } else if (CLINIC_ROLES.includes(role)) {
                navigate('/veterinary/dashboard')
            } else if (PET_OWNER_ROLES.includes(role)) {
                navigate('/pet-owner/dashboard')
            }
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        loginMutation.mutate(credentials)
    }

    const StyledPaper = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(3),
        maxWidth: 600,
        margin: '0 auto',
    }));
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
                            autoFocus
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
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
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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