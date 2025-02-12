import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';

import { createClinic } from '@/components/api/clinic';
import { Clinic } from '@/components/types/Clinic.types';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { countries } from '../../../constants/countries';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
  margin: '0 auto',
}));

const CreateClinic: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required(t('clinic.validation.nameRequired')),
    addressLine1: Yup.string().required(t('clinic.validation.addressRequired')),
    addressLine2: Yup.string(),
    city: Yup.string().required(t('clinic.validation.cityRequired')),
    country: Yup.string().required(t('clinic.validation.countryRequired')),
    zipcode: Yup.string(),
    phone: Yup.string().required(t('clinic.validation.phoneRequired')),
    email: Yup.string()
      .email(t('clinic.validation.emailInvalid'))
      .required(t('clinic.validation.emailRequired')),
  });

  const clinicMutation = useMutation({
    mutationFn: createClinic,
    onSuccess: (data) => {
      navigate('/staff/clinics/' + data.id, {
        state: {
          snackbar: {
            message: t('clinic.messages.createSuccess'),
            severity: 'success',
          }
        }
      });
    }
  })


  const formik = useFormik<Clinic>({
    initialValues: {
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      zipcode: '',
      phone: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      clinicMutation.mutate(values)
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
            {t('clinic.title')}
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              label={t('clinic.name')}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              autoComplete="organization"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="addressLine1"
              name="addressLine1"
              label={t('clinic.addressLine1')}
              value={formik.values.addressLine1}
              onChange={formik.handleChange}
              error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
              helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
              autoComplete="address-line1"
            />

            <TextField
              margin="normal"
              fullWidth
              id="addressLine2"
              name="addressLine2"
              label={t('clinic.addressLine2')}
              value={formik.values.addressLine2}
              onChange={formik.handleChange}
              error={formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)}
              helperText={formik.touched.addressLine2 && formik.errors.addressLine2}
              autoComplete="address-line2"
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="city"
                name="city"
                label={t('clinic.city')}
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="country-select-label">{t('clinic.country')}</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country"
                  name="country"
                  value={formik.values.country}
                  label={t('clinic.country')}
                  onChange={formik.handleChange}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  sx={{ textAlign: 'left' }}
                  autoComplete="country"
                >
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>{country}</MenuItem>
                  ))}
                </Select>
                <FormHelperText error={formik.touched.country && Boolean(formik.errors.country)}>
                  {formik.touched.country && formik.errors.country}
                </FormHelperText>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                margin="normal"
                fullWidth
                id="zipcode"
                name="zipcode"
                label={t('clinic.zipcode')}
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                helperText={formik.touched.zipcode && formik.errors.zipcode}
                autoComplete="postal-code"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                name="phone"
                label={t('clinic.phone')}
                value={formik.values.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 - $3')}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^\d]/g, '');
                  formik.setFieldValue('phone', rawValue);
                }}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                inputMode="numeric"
                autoComplete="tel"
              />
            </Box>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              type="email"
              label={t('clinic.email')}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoComplete="email"
            />

            {clinicMutation.isError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {clinicMutation.error instanceof Error
                  ? clinicMutation.error.message
                  : 'Invalid credentials.'}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
            >
              {t('clinic.submit')}
            </Button>

          </Box>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default CreateClinic;