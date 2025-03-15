import { getClinic } from '@/components/api/clinic';
import { getUser } from '@/components/api/users';
import InfoRow from '@/components/common/InfoRow';
import { formatPhoneAndCode } from '@/components/common/utils/FormatPhone';
import { ClinicUser, User } from '@/components/types/User.types';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, Paper, Stack, styled, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ClinicInfoDisplayComponent from '../../common/clinic/ClinicInfoDisplayComponent';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    width: '100%',
}));


const ViewUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { data: user, isLoading, isError } = useQuery<User | ClinicUser, Error>({
        queryKey: ['user', id],
        queryFn: () => getUser(id as string),
    });

    const { data: clinic } = useQuery({
        queryKey: ['clinic', user],
        queryFn: () => getClinic(String((user as ClinicUser)?.clinic)),
        enabled: !!(user && 'clinic' in user),
    });

    if (isLoading) {
        return (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
                {t('common.loading')}
            </Typography>
        );
    }

    if (isError || !user) {
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
                    {t('user.detailsTitle')}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 3, mb: 3 }}>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/staff/users/${id}/edit`)}
                    >
                        {t('common.edit')}
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/staff/users/${id}/change-clinic`)}
                    >
                        {t('user.changeClinic')}
                    </Button>

                </Stack>
            </Box>

            <StyledPaper elevation={3}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    {t("clinic.basicInfo")}
                </Typography>
                <InfoRow label={t('common.id')} value={user.id ? user.id : ''} />
                <InfoRow label={t('common.name')} value={user.name} />
                <InfoRow label={t('common.lastName')} value={user.lastName} />
                <InfoRow label={t('common.email')} value={user.email} />
                <InfoRow label={t('common.phone')} value={formatPhoneAndCode(user.phone).countryCode + " " + formatPhoneAndCode(user.phone).phoneNumber} />
            </StyledPaper>

            {clinic && (
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" >
                        {t('clinic.detailsTitle')}
                    </Typography>
                    <StyledPaper elevation={3} sx={{ mt: 3 }}>

                        <ClinicInfoDisplayComponent clinic={clinic} linked={true} />
                    </StyledPaper>
                </Box>
            )}
        </Container>
    );
};

export default ViewUser;