import React from 'react';
import { Typography } from '@mui/material';

// Props 타입 이름을 BodyMProps로 변경
type BodyMProps = {
    children: React.ReactNode;
};

// 파라미터 타입도 BodyMProps로 변경
const BodyM = ({ children }: BodyMProps) => {
    return (
        <Typography
            sx={{
                fontSize: '16px',
                fontWeight: '400',
                fontFamily: 'Pretendard',
                lineHeight: 1.5,
            }}
        >
            {children}
        </Typography>
    );
};

export default BodyM;