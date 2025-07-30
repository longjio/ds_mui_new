// D:/ds_mui_new/src/components/typography/TitleL.tsx

import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

/**
 * TitleLProps는 MUI의 TypographyProps를 확장하여
 * sx, component 등 Typography가 받는 모든 prop을 지원하도록 합니다.
 */
export interface TitleLProps extends TypographyProps {}

const TitleL = ({ children, sx, ...rest }: TitleLProps) => {
    return (
        <Typography
            {...rest} // component, variant 등 나머지 prop들을 전달합니다.
            sx={{
                // 컴포넌트의 기본 스타일
                fontSize: '28px',
                fontWeight: '600',
                fontFamily: 'Pretendard',
                lineHeight: 1.5,
                // 외부에서 전달된 sx를 마지막에 적용하여 덮어쓰기를 허용합니다.
                ...sx,
            }}
        >
            {children}
        </Typography>
    );
};

export default TitleL;