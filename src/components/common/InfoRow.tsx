import { Grid2, Typography } from "@mui/material";
import { ReactNode } from "react";

const InfoRow = ({ label, value }: { label: string; value: ReactNode }) => (
    <Grid2 container spacing={2} sx={{ mb: 2 }}>
        <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                    textAlign: 'right',
                    fontWeight: 'bold'
                }}
            >
                {label}:
            </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>{value || ''}</Typography>
        </Grid2>
    </Grid2>
);
export default InfoRow;