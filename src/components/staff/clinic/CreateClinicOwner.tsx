import {
    Alert,
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    styled,
    TextField,
    Typography,
} from '@mui/material';

import { createClinicOwner } from '@/components/api/clinic';
import { ClinicUser } from '@/components/types/User.types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
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
    const [phoneDisplay, setPhoneDisplay] = React.useState('');
    const [countryCode, setCountryCode] = React.useState('+1');

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
    });


    const clinicOwnerMutation = useMutation({
        mutationFn: createClinicOwner,
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




    // Add this handler for phone changes
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhone = e.target.value;
        setPhoneDisplay(newPhone);
        formik.setFieldValue('phone', `${countryCode}${newPhone.replace(/[\s-]/g, '')}`);
    };

    const formik = useFormik<ClinicUser>({
        initialValues: {
            name: '',
            lastName: '',
            phone: '',
            email: '',
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

    // Add this effect to update the phone when country code changes
    React.useEffect(() => {
        if (phoneDisplay) {
            formik.setFieldValue('phone', `${countryCode}${phoneDisplay.replace(/[\s-]/g, '')}`);
        }
    }, [countryCode]);

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

                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            <FormControl sx={{
                                minWidth: 130,
                                mt: 2,
                                '& .MuiInputBase-root': {
                                    height: '56px', // Match TextField height
                                }
                            }}>
                                <InputLabel id="country-code-label">{t('common.countryCode')}</InputLabel>
                                <Select

                                    labelId="country-code-label"
                                    value={countryCode}
                                    label={t('common.countryCode')}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    size="small"
                                >
                                    <MenuItem value="+1">+1 (US/CA)</MenuItem>

                                    <MenuItem value="+44">+44 (UK)</MenuItem>
                                    <MenuItem value="+52">+52 (MX)</MenuItem>
                                    <MenuItem value="+34">+34 (ES)</MenuItem>
                                    <MenuItem value="+593">+593 (EC)</MenuItem>

                                    {/* Add more country codes as needed */}
                                </Select>
                            </FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                name="phone"
                                type="tel"
                                label={t('common.phone')}
                                value={phoneDisplay}
                                onChange={handlePhoneChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                                autoComplete="tel"
                                placeholder="123-456-7890"
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

export default CreateClinicOwner;