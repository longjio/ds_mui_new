import React from 'react';
import { Typography } from '@mui/material';

// Props 타입 이름을 BodySProps로 변경
type BodySProps = {
    children: React.ReactNode;
};

// 파라미터 타입도 BodySProps로 변경
const BodyS = ({ children }: BodySProps) => {
    return (
        <Typography
            sx={{
                fontSize: '14px',
                fontWeight: '400',
                fontFamily: 'Pretendard',
                lineHeight: 1.5,
            }}
        >
            {children}
        </Typography>
    );
};

export default BodyS;