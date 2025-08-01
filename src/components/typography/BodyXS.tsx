// D:/ds_mui_new/src/components/typography/BodyXS.tsx

import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

/**
 * BodyXSProps는 MUI의 TypographyProps를 확장하여
 * sx, component, noWrap 등 Typography가 받는 모든 prop을 지원하도록 합니다.
 */
export interface BodyXSProps extends TypographyProps {}

const BodyXS = ({ children, sx, ...rest }: BodyXSProps) => {
    return (
        <Typography
            {...rest} // component, noWrap 등 나머지 prop들을 전달합니다.
            sx={{
                // 컴포넌트의 기본 스타일
                fontSize: '12px', // BodyS보다 작은 폰트 크기
                fontWeight: '400',
                fontFamily: 'Pretendard',
                lineHeight: 1.4, // 적절한 줄 간격
                // 외부에서 전달된 sx를 마지막에 적용하여 덮어쓰기를 허용합니다.
                ...sx,
            }}
        >
            {children}
        </Typography>
    );
};

export default BodyXS;