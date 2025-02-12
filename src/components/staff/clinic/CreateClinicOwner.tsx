import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    styled,
    TextField,
    Typography,
} from '@mui/material';

import { createClinicOwner } from '@/components/api/clinic';
import { ClinicUser } from '@/components/types/User.types';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: '0 auto',
}));

const CreateClinicOwner: React.FC = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const validationSchema = Yup.object({
        name: Yup.string().required(t('clinic.validation.nameRequired')),
        lastName: Yup.string().required(t('clinic.validation.lastNameRequired')),
        email: Yup.string()
            .email(t('clinic.validation.emailInvalid'))
            .required(t('clinic.validation.emailRequired')),
    });


    const clinicOwnerMutation = useMutation({
        mutationFn: createClinicOwner,
        // onSuccess: (data) => {
        onSuccess: () => {
            navigate('/staff/dashboard', {
                state: {
                    snackbar: {
                        message: t('clinic.messages.createSuccess'),
                        severity: 'success',
                    }
                }
            });
        }
    })


    const formik = useFormik<ClinicUser>({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            clinic: id || '',
        },
        validationSchema,
        onSubmit: (values) => {
            clinicOwnerMutation.mutate(values)
        },
    });

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
                        {t('clinic.clinicOwner.createTitle')}
                    </Typography>

                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }} noValidate>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                name="name"
                                label={t('common.name')}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                autoComplete="given-name"
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label={t('common.lastName')}
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                autoComplete="family-name"
                            />
                        </Box>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            type="email"
                            label={t('common.email')}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            autoComplete="email"
                        />


                        {clinicOwnerMutation.isError && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {clinicOwnerMutation.error instanceof Error
                                    ? clinicOwnerMutation.error.message
                                    : 'Error creating Clinic owner.'}
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                        >
                            {t('common.create')}
                        </Button>

                    </Box>
                </StyledPaper>
            </Box>
        </Container>
    );
};

export default CreateClinicOwner;