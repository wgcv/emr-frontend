import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Box, Link, Stack, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3
            }}
        >

            {/* Social Media Icons */}
            <Stack
                direction="row"
                spacing={3}
                sx={{
                    '& svg': {
                        color: 'primary.main',
                        fontSize: 24,
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'primary.dark',
                        }
                    }
                }}
            >
                <Link href="#"><Facebook /></Link>
                <Link href="#"><Twitter /></Link>
                <Link href="#"><Instagram /></Link>
                <Link href="#"><LinkedIn /></Link>

            </Stack>

            {/* Copyright */}
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ opacity: 0.7 }}
            >
                ©{new Date().getFullYear()} emr.vet All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
