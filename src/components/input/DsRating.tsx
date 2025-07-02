import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Rating, { RatingProps as MuiRatingProps } from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

interface DsRatingProps extends Omit<MuiRatingProps, 'onChange'> {
    label?: string;
    boxSx?: BoxProps['sx'];
    onChange?: (event: React.SyntheticEvent, value: number | null) => void;
}

export default function DsRating({
                                     label,
                                     name,
                                     value,
                                     defaultValue,
                                     onChange,
                                     readOnly = false,
                                     disabled = false,
                                     boxSx,
                                     ...muiRatingProps
                                 }: DsRatingProps) {
    return (
        <Box
            sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                ...boxSx,
            }}
        >
            {label && (
                <Typography
                    component="legend"
                    variant="caption"
                    sx={{ mb: 0.5 }}
                >
                    {label}
                </Typography>
            )}
            <Rating
                name={name}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                readOnly={readOnly}
                disabled={disabled}
                {...muiRatingProps}
            />
        </Box>
    );
}