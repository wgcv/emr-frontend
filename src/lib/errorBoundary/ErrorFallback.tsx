import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';

interface ErrorFallbackProps {
    error?: Error;
    resetErrorBoundary?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                border: '1px solid #ffcdd2',
                my: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />

                <Typography variant="h5" component="h2" color="error" gutterBottom>
                    Something went wrong
                </Typography>

                {error && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {error.message}
                    </Typography>
                )}

                {resetErrorBoundary && (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={resetErrorBoundary}
                        sx={{ mt: 2 }}
                    >
                        Try Again
                    </Button>
                )}
            </Box>
        </Paper>
    );
};

export default ErrorFallback;