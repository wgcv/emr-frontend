import { getClinics } from '@/components/api/clinic';
import { Clinic } from '@/components/types/Clinic.types';
import { ClinicUser } from '@/components/types/User.types';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { FormikProps } from 'formik';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';



interface ClinicAutocompleteProps {
  formik: FormikProps<ClinicUser>;
}

const ClinicAutocomplete: React.FC<ClinicAutocompleteProps> = ({ formik }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Debounced search function
  const fetchClinics = React.useMemo(
    () =>
      debounce(async (searchTerm: string) => {
        setLoading(true);
        try {
          const results = await getClinics(0, 5, searchTerm);
          setOptions(results.clinics);
        } catch (error) {
          console.error('Error fetching clinics:', error);
          setOptions([]);
        } finally {
          setLoading(false);
        }
      }, 400),
    []
  );

  useEffect(() => {
    if (inputValue.trim() !== '') {
      fetchClinics(inputValue);
    }

    return () => {
      fetchClinics.cancel();
    };
  }, [inputValue, fetchClinics]);

  return (
    <Autocomplete
      id="clinic"
      fullWidth
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.name || ''}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={formik.values.clinic}
      onChange={(_, newValue) => {
        formik.setFieldValue('clinic', newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="normal"
          label={t('common.clinic')}
          error={formik.touched.clinic && Boolean(formik.errors.clinic)}
          helperText={formik.touched.clinic && (formik.errors.clinic as string)}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }
          }}
        />
      )}
    />
  );
};

export default ClinicAutocomplete;