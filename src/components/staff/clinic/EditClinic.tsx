import {
  Alert,
  Box,
  Button,
  CircularProgress,
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

import { getClinic, updateClinic } from '@/components/api/clinic';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { countries } from '../../../constants/countries';

import { Clinic } from '../../types/Clinic.types';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
  margin: '0 auto',
}));

const EditClinic: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
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

  const { data: clinic, isLoading, error } = useQuery({
    queryKey: ['clinic', id],
    queryFn: () => getClinic(id!),
    enabled: !!id,
  });
  const updateClinicMutation = useMutation({
    mutationFn: (data: Clinic) => updateClinic(id!, data),
    onSuccess: (data: Clinic) => {
      navigate('/staff/clinics/' + data.id, {
        state: {
          snackbar: {
            message: t('clinic.messages.updateSuccess'),
            severity: 'success',
          }
        }
      });
    }
  });

  const formik = useFormik<Clinic>({
    initialValues: {
      name: clinic?.name ?? '',
      addressLine1: clinic?.addressLine1 ?? '',
      addressLine2: clinic?.addressLine2 ?? '',
      city: clinic?.city ?? '',
      country: clinic?.country ?? '',
      zipcode: clinic?.zipcode ?? '',
      phone: clinic?.phone ?? '',
      email: clinic?.email ?? '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      updateClinicMutation.mutate(values);
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
            {t('clinic.editTitle')}
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }} noValidate>
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
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="addressLine1"
              name="addressLine1"
              label={t('common.addressLine1')}
              value={formik.values.addressLine1}
              onChange={formik.handleChange}
              error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
              helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
            />

            <TextField
              margin="normal"
              fullWidth
              id="addressLine2"
              name="addressLine2"
              label={t('common.addressLine2')}
              value={formik.values.addressLine2}
              onChange={formik.handleChange}
              error={formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)}
              helperText={formik.touched.addressLine2 && formik.errors.addressLine2}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="city"
                name="city"
                label={t('common.city')}
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="country-select-label">{t('common.country')}</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country"
                  name="country"
                  value={formik.values.country}
                  label={t('common.country')}
                  onChange={formik.handleChange}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  sx={{ textAlign: 'left' }}
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
                label={t('common.zipcode')}
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                helperText={formik.touched.zipcode && formik.errors.zipcode}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                name="phone"
                label={t('common.phone')}
                value={formik.values.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 - $3')}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^\d]/g, '');
                  formik.setFieldValue('phone', rawValue);
                }}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                inputMode="numeric"
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
            />

            {updateClinicMutation.isError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {updateClinicMutation.error instanceof Error
                  ? updateClinicMutation.error.message
                  : t('clinic.messages.updateError')}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              disabled={updateClinicMutation.isPending}
            >
              {updateClinicMutation.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t('clinic.update')
              )}
            </Button>
          </Box>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default EditClinic;