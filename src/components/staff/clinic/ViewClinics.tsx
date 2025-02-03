import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../hooks/useDebounce';
import { getClinics } from './api/clinic';
import { GetClinicResponse } from './types/Clinic.types';

// Add this constant at the top of the file, after the imports
const commonCellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};

const ViewClinics: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, isLoading, isError } = useQuery<GetClinicResponse, Error>(
        {
            queryKey: ['clinics', page, rowsPerPage, debouncedSearchQuery],
            queryFn: () => getClinics(page, rowsPerPage, debouncedSearchQuery),

        }
    );


    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    if (isError) {
        return <Typography color="error">Error loading clinics</Typography>;
    }

    const handleRowClick = (clinicId: string) => {
        navigate(`/staff/clinics/${clinicId}`);
    };

    // Add debounced search handler
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0); // Reset to first page when searching
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', mb: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {t('clinic.viewTitle')}
                </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label={t('common.search')}

                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <TableContainer
                component={Paper}
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    overflowX: 'auto',
                    '&::-webkit-scrollbar': {
                        height: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,.2)',
                        borderRadius: '4px',
                    }
                }}
            >
                <Table aria-label="clinics table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ ...commonCellStyle, display: { xs: 'none', sm: 'table-cell' }, maxWidth: 100 }}>{t('clinic.id')}</TableCell>
                            <TableCell sx={{ ...commonCellStyle, maxWidth: 200 }}>{t('clinic.name')}</TableCell>
                            <TableCell sx={{ ...commonCellStyle, display: { xs: 'none', sm: 'table-cell' }, maxWidth: 200 }}>{t('clinic.addressLine1')}</TableCell>
                            <TableCell sx={{ ...commonCellStyle, maxWidth: 150 }}>{t('clinic.city')}</TableCell>
                            <TableCell sx={{ ...commonCellStyle, maxWidth: 150 }}>{t('clinic.country')}</TableCell>
                            <TableCell sx={{ ...commonCellStyle, maxWidth: 150 }}>{t('clinic.phone')}</TableCell>
                            <TableCell sx={{ ...commonCellStyle, display: { xs: 'none', sm: 'table-cell' }, maxWidth: 200 }}>{t('clinic.email')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.clinics.map((clinic) => (
                            <TableRow
                                key={clinic._id}
                                onClick={() => clinic._id && handleRowClick(clinic._id)}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    },
                                    transition: 'background-color 0.2s ease'
                                }}
                            >
                                <TableCell sx={{ ...commonCellStyle, display: { xs: 'none', sm: 'table-cell' }, maxWidth: 100 }}>{clinic._id}</TableCell>
                                <TableCell sx={{ ...commonCellStyle, maxWidth: 200 }}>{clinic.name}</TableCell>
                                <TableCell sx={{ ...commonCellStyle, display: { xs: 'none', md: 'table-cell' }, maxWidth: 200 }}>{clinic.addressLine1}</TableCell>
                                <TableCell sx={{ ...commonCellStyle, maxWidth: 150 }}>{clinic.city}</TableCell>
                                <TableCell sx={{ ...commonCellStyle, maxWidth: 150 }}>{clinic.country}</TableCell>
                                <TableCell sx={{ ...commonCellStyle, maxWidth: 150 }}>
                                    {clinic.phone.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3')}
                                </TableCell>
                                <TableCell sx={{ ...commonCellStyle, display: { xs: 'none', sm: 'table-cell' }, maxWidth: 200 }}>{clinic.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data?.pagination.totalItems || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
};

export default ViewClinics;