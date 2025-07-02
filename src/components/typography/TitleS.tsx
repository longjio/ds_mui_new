import React from 'react';
import { Typography } from '@mui/material';

// Props 타입 이름을 TitleSProps로 변경
type TitleSProps = {
    children: React.ReactNode;
};

// 파라미터 타입도 TitleSProps로 변경
const TitleS = ({ children }: TitleSProps) => {
    return (
        <Typography
            sx={{
                fontSize: '24px',
                fontWeight: '600',
                fontFamily: 'Pretendard',
                lineHeight: 1.5,
            }}
        >
            {children}
        </Typography>
    );
};

export default TitleS;