import { getClinic } from '@/components/api/clinic';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Button, Container, Paper, Stack, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Clinic } from '../../types/Clinic.types';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    width: '100%',
}));

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 4 }}>
            <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                    textAlign: 'right',
                    fontWeight: 'bold'
                }}
            >
                {label}:
            </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>{value || ''}</Typography>
        </Grid>
    </Grid>
);

const ViewClinic: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { data: clinic, isLoading, isError } = useQuery<Clinic, Error>({
        queryKey: ['clinic', id],
        queryFn: () => getClinic(id as string),
    });

    if (isLoading) {
        return (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
                {t('common.loading')}
            </Typography>
        );
    }

    if (isError || !clinic) {
        return (
            <Typography variant="body1" color="error" sx={{ textAlign: 'center', mt: 4 }}>
                {t('clinic.error.notFound')}
            </Typography>
        );
    }

    const formatPhone = (phone: string) => {
        return phone.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ width: '100%', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {t('clinic.detailsTitle')}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 3, mb: 3 }}>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/staff/clinics/${id}/edit`)}
                    >
                        {t('common.edit')}
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<PersonAddIcon />}
                        onClick={() => navigate(`/staff/clinics/${id}/owners/create`)}
                    >
                        {t('clinic.addOwner')}
                    </Button>
                </Stack>
            </Box>

            <StyledPaper elevation={3}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    {t("clinic.basicInfo")}
                </Typography>
                <InfoRow label={t('clinic.id')} value={clinic.id ? clinic.id : ''} />
                <InfoRow label={t('clinic.name')} value={clinic.name} />
                <InfoRow label={t('clinic.email')} value={clinic.email} />
                <InfoRow label={t('clinic.phone')} value={formatPhone(clinic.phone)} />
                <Typography variant="h5" sx={{ mb: 2 }}>
                    {t("clinic.addressInfo")}
                </Typography>
                <InfoRow label={t('clinic.addressLine1')} value={clinic.addressLine1} />
                {clinic.addressLine2 && (
                    <InfoRow label={t('clinic.addressLine2')} value={clinic.addressLine2} />
                )}
                <InfoRow label={t('clinic.zipcode')} value={clinic.zipcode} />
                <InfoRow label={t('clinic.city')} value={clinic.city} />
                <InfoRow label={t('clinic.country')} value={clinic.country} />

            </StyledPaper>
        </Container>
    );
};

export default ViewClinic;