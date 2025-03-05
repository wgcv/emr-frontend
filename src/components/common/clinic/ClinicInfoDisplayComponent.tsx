import InfoRow from '@/components/common/InfoRow';
import { formatPhone } from '@/components/common/utils/FormatPhone';
import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Clinic } from '../../types/Clinic.types';

interface ClinicInfoDisplayProps {
    clinic: Clinic;
    linked?: boolean;
    showId?: boolean;
}

const ClinicInfoDisplayComponent: React.FC<ClinicInfoDisplayProps> = ({ clinic, linked = false, showId = false }) => {
    const { t } = useTranslation();
    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>
                {t("clinic.basicInfo")}
            </Typography>
            {showId && (
                <InfoRow label={t('common.id')} value={clinic.id ? clinic.id : ''} />
            )}
            {linked ? (
                <InfoRow label={t('common.name')} value={
                    <Link
                        component={RouterLink}
                        to={`/staff/clinics/${clinic.id}`}
                        sx={{ textDecoration: 'none' }}
                    >
                        {clinic.name}
                    </Link>
                } />

            ) :
                (
                    <InfoRow label={t('common.name')} value={clinic.name} />

                )}
            <InfoRow label={t('common.email')} value={clinic.email} />
            <InfoRow label={t('common.phone')} value={formatPhone(clinic.phone)} />
            {!linked && (
                <Box>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        {t("common.addressInfo")}
                    </Typography>

                    <InfoRow label={t('common.addressLine1')} value={clinic.addressLine1} />
                    {clinic.addressLine2 && (
                        <InfoRow label={t('common.addressLine2')} value={clinic.addressLine2} />
                    )}
                    <InfoRow label={t('common.zipcode')} value={clinic.zipcode} />
                    <InfoRow label={t('common.city')} value={clinic.city} />
                    <InfoRow label={t('common.country')} value={clinic.country} />
                </Box>
            )}

        </>
    );
};

export default ClinicInfoDisplayComponent;