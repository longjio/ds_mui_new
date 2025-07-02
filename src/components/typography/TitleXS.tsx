import React from 'react';
import { Typography } from '@mui/material';

// Props 타입 이름을 TitleXSProps로 변경
type TitleXSProps = {
    children: React.ReactNode;
};

// 파라미터 타입도 TitleXSProps로 변경
const TitleXS = ({ children }: TitleXSProps) => {
    return (
        <Typography
            sx={{
                fontSize: '20px',
                fontWeight: '600',
                fontFamily: 'Pretendard',
                lineHeight: 1.5,
            }}
        >
            {children}
        </Typography>
    );
};

export default TitleXS;