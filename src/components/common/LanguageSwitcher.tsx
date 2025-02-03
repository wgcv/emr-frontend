import { Button, ButtonGroup } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'en';
        i18n.changeLanguage(savedLanguage);
    }, [i18n]);

    const handleLanguageChange = (language: string) => {
        localStorage.setItem('language', language);
        i18n.changeLanguage(language);
    };

    return (
        <ButtonGroup size="small">
            <Button
                variant={i18n.language === 'en' ? 'contained' : 'outlined'}
                onClick={() => handleLanguageChange('en')}
            >
                EN
            </Button>
            <Button
                variant={i18n.language === 'es' ? 'contained' : 'outlined'}
                onClick={() => handleLanguageChange('es')}
            >
                ES
            </Button>
        </ButtonGroup>
    );
};