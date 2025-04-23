import {
    Alert,
    Box,
    Button,
    Container,
    MenuItem,
    Paper,
    styled,
    TextField,
    Typography,
} from '@mui/material';

import { invitationVeterinary } from '@/components/api/veterinary';

import PhoneInputComponent from '@/components/common/PhoneInputComponent';
import { ClinicUser } from '@/components/types/User.types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import {
    Chip,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
} from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: '0 auto',
}));

const InviteVeterinary: React.FC = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const validationSchema = Yup.object({
        name: Yup.string().required(t('common.validation.nameRequired')),
        lastName: Yup.string().required(t('common.validation.lastNameRequired')),
        email: Yup.string()
            .email(t('common.validation.emailInvalid'))
            .required(t('common.validation.emailRequired')),
        phone: Yup.string()
            .matches(
                /^\+\d{10,15}$/,
                t('common.validation.phoneInvalid')
            )
            .required(t('common.validation.phoneRequired')),
        roles: Yup.array()
            .min(1, t('common.validation.roleRequired'))
            .required(t('common.validation.roleRequired')),
    });


    const clinicOwnerMutation = useMutation({
        mutationFn: invitationVeterinary,
        onSuccess: () => {
            navigate('/staff/dashboard', {
                state: {
                    snackbar: {
                        message: t('veterinary.addSuccess'),
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
            phone: '',
            email: '',
            roles: [],
            clinic: {
                id: id || '',
                name: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                country: '',
                zipcode: '',
                phone: '',
                email: ''
            },
        },
        validationSchema,
        onSubmit: (values) => {
            clinicOwnerMutation.mutate(values)
        },
    });



    const getErrorMessage = (error: unknown): string => {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            return error.response.data.message;
        }
        if (error instanceof Error) {
            return error.message;
        }
        return t('clinic.errors.defaultError');
    };



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
                        {t('veterinary.addTitle')}
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

                        <PhoneInputComponent formik={formik} />

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

                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            error={formik.touched.roles && Boolean(formik.errors.roles)}
                        >
                            <InputLabel id="roles-label">{t('common.role')}</InputLabel>
                            <Select
                                labelId="roles-label"
                                id="roles"
                                name="roles"
                                multiple
                                value={formik.values.roles || []}
                                onChange={formik.handleChange}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {(selected as string[]).map((value) => (
                                            <Chip key={value} label={t(`roles.${value}`)} />
                                        ))}
                                    </Box>
                                )}
                            >
                                <MenuItem value="veterinarian">{t('roles.veterinarian')}</MenuItem>
                                <MenuItem value="assistant">{t('roles.assistant')}</MenuItem>
                            </Select>
                            {formik.touched.roles && formik.errors.roles && (
                                <FormHelperText>{formik.errors.roles as string}</FormHelperText>
                            )}
                        </FormControl>
                        {clinicOwnerMutation.isError && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {getErrorMessage(clinicOwnerMutation.error)}
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

export default InviteVeterinary;