import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    FormControlLabel,
    Paper,
    styled,
    Switch,
    Typography,
} from '@mui/material';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { getUser, updateUser } from '@/components/api/users';
import { User } from '@/components/types/User.types';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: '0 auto',
}));

const ChangePermissions: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const validationSchema = Yup.object({
        name: Yup.string().required(t('users.validation.nameRequired')),
        lastName: Yup.string().required(t('users.validation.lastNameRequired')),
        email: Yup.string()
            .email(t('users.validation.emailInvalid'))
            .required(t('users.validation.emailRequired')),
        phone: Yup.string()
            .matches(
                /^\+\d{10,15}$/,
                t('common.validation.phoneInvalid')
            )
            .required(t('common.validation.phoneRequired')),

    });

    // Add this handler for phone changes

    // Add after the user query
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            return await getUser(id!);
        },
        enabled: !!id,
    });


    const updateUserMutation = useMutation({
        mutationFn: (data: User) => {
            return updateUser(id!, data)
        },
        onSuccess: (data: User) => {
            console.log("data", data);
            navigate('/staff/users/' + data.id, {
                state: {
                    snackbar: {
                        message: t('user.messages.updateSuccess'),
                        severity: 'success',
                    }
                }
            });
        }
    });

    // Determine if the user has a clinic to decide which type to use

    const formik = useFormik<User>({
        initialValues: {
            name: user?.name ?? '',
            lastName: user?.lastName ?? '',
            phone: user?.phone ?? '',
            email: user?.email ?? '',
            roles: user?.roles ?? [],
            isActive: user?.isActive ?? true,
        },

        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            updateUserMutation.mutate(values);
        },
    });

    if (isLoading) {
        return (
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error instanceof Error ? error.message : t('clinic.messages.loadError')}
                </Alert>
            </Container>
        );
    }
    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
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
                        {t('user.editTitle')}
                    </Typography>

                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }} noValidate>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formik.values.isActive}
                                    onChange={(event) => {
                                        formik.setFieldValue('isActive', event.target.checked);
                                    }}
                                    name="isActive"
                                />
                            }
                            label={t('user.access.isActive')}
                            sx={{ mb: 2, width: '100%' }}
                        />

                        {updateUserMutation.isError && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {updateUserMutation.error instanceof Error
                                    ? updateUserMutation.error.message
                                    : t('user.messages.updateError')}
                            </Alert>
                        )}


                        <Button

                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                            disabled={updateUserMutation.isPending}
                        >
                            {updateUserMutation.isPending ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                t('common.update')
                            )}
                        </Button>
                    </Box>
                </StyledPaper>
            </Box >
        </Container >
    );
};

export default ChangePermissions;
