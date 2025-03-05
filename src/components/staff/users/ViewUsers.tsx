import { getUsers } from '@/components/api/users';
import { GetUserResponse } from '@/components/types/User.types';
import { Add as AddIcon } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
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
    Typography
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../hooks/useDebounce';

const commonCellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};

const ViewUsers: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // You can use isLoading but we don't use because flicking the table
    const { data, isError } = useQuery<GetUserResponse, Error>(
        {
            queryKey: ['users', page, rowsPerPage, debouncedSearchQuery],
            queryFn: () => getUsers(page, rowsPerPage, debouncedSearchQuery),

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
        return <Typography color="error">t('users.error.loading')</Typography>;
    }

    const handleRowClick = (userId: string) => {
        navigate(`/staff/users/${userId}`);
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
                    {t('user.viewTitle')}
                </Typography>
            </Box>

            <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label={t('common.search')}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/staff/users/create')}

                    sx={{
                        fontWeight: 500,
                    }}
                    startIcon={<AddIcon />}
                >
                    {t('common.create')}
                </Button>

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
                <Table aria-label="users table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ ...commonCellStyle, maxWidth: 200, fontWeight: 'bold', fontSize: "1rem" }}>{t('common.name')}</TableCell>
                            <TableCell sx={{ ...commonCellStyle, maxWidth: 150, fontWeight: 'bold', fontSize: "1rem" }}>{t('common.lastName')}</TableCell>
                            <TableCell sx={{ ...commonCellStyle, maxWidth: 150, fontWeight: 'bold', fontSize: "1rem" }}>{t('common.email')}</TableCell>
                            <TableCell sx={{ ...commonCellStyle, maxWidth: 150, fontWeight: 'bold', fontSize: "1rem" }}>{t('common.phone')}</TableCell>
                            <TableCell sx={{ ...commonCellStyle, maxWidth: 150, fontWeight: 'bold', fontSize: "1rem" }}>{t('common.clinic')}</TableCell>
                            <TableCell sx={{ ...commonCellStyle, display: { xs: 'none', sm: 'table-cell' }, maxWidth: 200, textAlign: "center", fontWeight: 'bold', fontSize: "1rem" }}>{t('common.active')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.users.map((user) => (
                            <TableRow
                                key={user.id}
                                onClick={() => user.id && handleRowClick(user.id)}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    },
                                    transition: 'background-color 0.2s ease'
                                }}
                            >
                                <TableCell sx={{ ...commonCellStyle, maxWidth: 150 }}>{user.name}</TableCell>
                                <TableCell sx={{ ...commonCellStyle, maxWidth: 150 }}>{user.lastName}</TableCell>
                                <TableCell sx={{ ...commonCellStyle, maxWidth: 150 }}>
                                    {user.email}
                                </TableCell>
                                <TableCell sx={{ ...commonCellStyle, maxWidth: 150 }}>
                                    {user.phone}
                                </TableCell>
                                <TableCell sx={{ ...commonCellStyle, maxWidth: 150 }}>
                                    {'clinic' in user ? user.clinic.name : '-'}
                                </TableCell>

                                <TableCell sx={{ ...commonCellStyle, display: { xs: 'none', sm: 'table-cell', textAlign: "center" }, maxWidth: 200 }}>{user.isActive ? "✅" : "❌"}</TableCell>
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
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}–${to} ${t('common.of')} ${count}`
                    }
                    labelRowsPerPage={t('common.rowPerPage')} // Custom text for "Rows per page"
                />
            </TableContainer>
        </Box>
    );
};

export default ViewUsers;