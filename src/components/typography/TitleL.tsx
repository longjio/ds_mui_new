import React from 'react';
import { Typography } from '@mui/material';

// Props 타입 이름을 TitleLProps로 변경
type TitleLProps = {
    children: React.ReactNode;
};

// 파라미터 타입도 TitleLProps로 변경
const TitleL = ({ children }: TitleLProps) => {
    return (
        <Typography
            sx={{
                fontSize: '30px',
                fontWeight: '600',
                fontFamily: 'Pretendard',
                lineHeight: 1.5,
            }}
        >
            {children}
        </Typography>
    );
};

export default TitleL;