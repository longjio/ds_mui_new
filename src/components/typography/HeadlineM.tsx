import React from 'react';
import { Typography } from '@mui/material';

type HeadlineProps = {
    children: React.ReactNode;
};

const HeadlineM = ({ children }: HeadlineProps) => {
    return (
        <Typography
            sx={{
                fontSize: '40px',
                fontWeight: '700',
                fontFamily: 'Pretendard',
                lineHeight: 1.5,
            }}
        >
            {children}
        </Typography>
    );
};

export default HeadlineM;
