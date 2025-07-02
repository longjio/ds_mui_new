import React from 'react';
import { Typography } from '@mui/material';

// Props 타입 이름을 BodyXSProps로 변경
type BodyXSProps = {
    children: React.ReactNode;
};

// 파라미터 타입도 BodyXSProps로 변경
const BodyXS = ({ children }: BodyXSProps) => {
    return (
        <Typography
            sx={{
                fontSize: '12px',
                fontWeight: '400',
                fontFamily: 'Pretendard',
                lineHeight: 1.5,
            }}
        >
            {children}
        </Typography>
    );
};

export default BodyXS;