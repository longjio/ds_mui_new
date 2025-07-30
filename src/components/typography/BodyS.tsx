import React from 'react';
// 1. TypographyProps를 import 합니다.
import { Typography, TypographyProps } from '@mui/material';

/**
 * 2. BodySProps가 MUI의 TypographyProps를 확장하도록 변경합니다.
 *    이제 sx, component 등 Typography가 받는 모든 prop을 지원합니다.
 */
export interface BodySProps extends TypographyProps {}

const BodyS = ({ children, sx, ...rest }: BodySProps) => {
    return (
        <Typography
            {...rest} // 3. component, variant 등 나머지 prop들을 전달합니다.
            sx={{
                // 컴포넌트의 기본 스타일
                fontSize: '14px',
                fontWeight: '400',
                fontFamily: 'Pretendard',
                lineHeight: 1.5,
                // 4. 외부에서 전달된 sx를 마지막에 적용하여 덮어쓰기를 허용합니다.
                ...sx,
            }}
        >
            {children}
        </Typography>
    );
};

export default BodyS;