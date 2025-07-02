import React from 'react';
import { Typography } from '@mui/material';

type HeadlineProps = {
    children: React.ReactNode;
};

const HeadlineL = ({ children }: HeadlineProps) => {
    return (
        <Typography
            sx={{
                fontSize: '48px',
                fontWeight: '700',
                fontFamily: 'Pretendard',
                lineHeight: 1.5,
            }}
        >
            {children}
        </Typography>
    );
};

export default HeadlineL;
