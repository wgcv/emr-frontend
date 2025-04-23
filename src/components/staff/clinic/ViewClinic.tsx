import { getClinic } from '@/components/api/clinic';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Button, Container, Paper, Stack, styled, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ClinicInfoDisplayComponent from '../../common/clinic/ClinicInfoDisplayComponent';
import { Clinic } from '../../types/Clinic.types';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    width: '100%',
}));


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
                {t('common.notFound')}
            </Typography>
        );
    }


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
                        onClick={() => navigate(`/staff/clinics/${id}/owner/invite`)}
                    >
                        {t('clinic.addOwner')}
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<PersonAddIcon />}
                        onClick={() => navigate(`/staff/clinics/${id}/veterinarian/invite`)}
                    >
                        {t('clinic.addVeterinary')}
                    </Button>
                </Stack>
            </Box>

            <StyledPaper elevation={3}>
                <ClinicInfoDisplayComponent clinic={clinic} showId={true} />
            </StyledPaper>
        </Container>
    );
};

export default ViewClinic;