import {
    Box,
    Card,
    CardContent,
    Container,

    Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { ThemeToggle } from '../common/ThemeToggle';

const Settings: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                </Typography>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {t('settings.language')}
                        </Typography>
                        <LanguageSwitcher />
                    </CardContent>
                </Card>
                <Card sx={{ mt: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {t('settings.theme')}
                        </Typography>
                        <ThemeToggle />
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Settings;
