import { Alert, Box } from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../common/Footer';
import AppBar from './AppBar';

const VeterinaryLayout = () => {
    const location = useLocation();
    const [snackbarState, setSnackbarState] = React.useState({
        open: false,
        message: '',
        position: {
            vertical: 'bottom',
            horizontal: 'left',
        },
        severity: null,

        key: 0,
    }
    )
    const handleCloseSnackbar = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarState({ ...snackbarState, open: false });
    };

    // Remove the second useEffect completely and update the first one:
    useEffect(() => {
        if (location.state && location.state.snackbar) {
            const newSnackbarState = { ...snackbarState };
            if (location.state.snackbar.message) {
                newSnackbarState.message = location.state.snackbar.message;
            }
            if (location.state.snackbar.position) {
                if (location.state.snackbar.position.vertical) {
                    newSnackbarState.position.vertical = location.state.snackbar.position.vertical;
                }
                if (location.state.snackbar.position.horizontal) {
                    newSnackbarState.position.horizontal = location.state.snackbar.position.horizontal;
                }
            }
            if (location.state.snackbar.severity) {
                newSnackbarState.severity = location.state.snackbar.severity;
            }
            newSnackbarState.open = true;
            newSnackbarState.key = Date.now();
            setSnackbarState(newSnackbarState);

            // Uncomment this line to clear the navigation state
            window.history.replaceState({}, document.title);
        }
    }, [location, snackbarState]); // Keep only location in dependencies


    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <AppBar />
            <Box
                component="main"
                sx={{
                    flex: 1,
                    maxWidth: "1280px",
                    width: '100%',
                    margin: "0 auto",
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingX: { xs: 2, sm: 3 },
                    overflowX: "hidden"
                }}
            >
                <Outlet />
            </Box>

            <Footer />
            <Snackbar
                open={snackbarState.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{
                    vertical: snackbarState.position.vertical as 'top' | 'bottom',
                    horizontal: snackbarState.position.horizontal as 'left' | 'right'
                }}
                key={snackbarState.key}

            >
                <Alert
                    onClose={handleCloseSnackbar}
                    variant="filled"
                    severity={snackbarState.severity || 'info'}

                    sx={{ width: '100%' }}
                >
                    {snackbarState.message}
                </Alert>

            </Snackbar>
        </Box>
    );
};

export default VeterinaryLayout;