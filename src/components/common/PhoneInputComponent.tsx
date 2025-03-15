import { Autocomplete, Box, FormControl, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { countryCodes, phoneAndCode } from './utils/FormatPhone';

import { FormikProps } from 'formik';

type PhoneInputComponentProps<T extends object> = {
    formik: FormikProps<T & { phone: string }>;
};

function PhoneInputComponent<T extends object>({ formik }: PhoneInputComponentProps<T>) {
    const [countryCode, setCountryCode] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<typeof countryCodes[0] | null>(null);
    const [phone, setPhone] = useState('');

    const { t } = useTranslation();

    useEffect(() => {
        const phoneObj = phoneAndCode(formik.values.phone);
        if (selectedCountry === null) {
            const country = countryCodes.find((country) => country.code === phoneObj.countryCode);
            setSelectedCountry(country || null);

        }
        setCountryCode(phoneObj.countryCode);
        setPhone(phoneObj.phoneNumber);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.phone]);

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth sx={{
                mt: 2,
                '& .MuiInputBase-root': {
                    height: '56px',
                }
            }}>
                <Autocomplete
                    fullWidth
                    id="countryCode"
                    options={countryCodes}
                    autoHighlight
                    getOptionLabel={(option) => option.flag + ' ' + option.country + ' ' + option.code}
                    value={selectedCountry}
                    onChange={(_event, value) => {
                        if (value) {
                            setSelectedCountry(value);
                            formik.setFieldValue('phone', value.code + phone);
                        }
                    }}
                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <Box
                                key={key}
                                component="li"
                                {...optionProps}
                            >
                                {option.flag} {option.country} ({option.label}) {option.code}
                            </Box>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            label={t('common.countryCode')}
                            slotProps={{
                                htmlInput: {
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                },
                            }}
                        />
                    )}
                />

            </FormControl>
            <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                name="phone"
                type="tel"
                label={t('common.phone')}
                value={phone}
                onChange={(e) => { formik.setFieldValue('phone', countryCode + e.target.value.replace(/[^\d]/g, '')) }}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && Boolean(formik.errors.phone)}
                autoComplete="tel"
                placeholder=""

            />
        </Box>);
};

export default PhoneInputComponent;