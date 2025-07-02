import React from 'react';
import { Typography } from '@mui/material';

// Props 타입 이름을 BodyLProps로 변경
type BodyLProps = {
    children: React.ReactNode;
};

// 파라미터 타입도 BodyLProps로 변경
const BodyL = ({ children }: BodyLProps) => {
    return (
        <Typography
            sx={{
                fontSize: '20px',
                fontWeight: '400',
                fontFamily: 'Pretendard',
                lineHeight: 1.5,
            }}
        >
            {children}
        </Typography>
    );
};

export default BodyL;