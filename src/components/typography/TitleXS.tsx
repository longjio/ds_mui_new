// D:/ds_mui_new/src/components/typography/TitleXS.tsx

import React from 'react';
// 1. TypographyProps를 import 합니다.
import { Typography, TypographyProps } from '@mui/material';

/**
 * 2. TitleXSProps가 MUI의 TypographyProps를 확장하도록 변경합니다.
 *    이제 sx, component 등 Typography가 받는 모든 prop을 지원합니다.
 */
export interface TitleXSProps extends TypographyProps {}

// 3. props에서 sx와 나머지 속성(...rest)을 받을 수 있도록 수정합니다.
const TitleXS = ({ children, sx, ...rest }: TitleXSProps) => {
    return (
        <Typography
            {...rest} // 4. component, variant 등 나머지 prop들을 전달합니다.
            sx={{
                // 컴포넌트의 기본 스타일
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: 'Pretendard',
                lineHeight: 1.5,
                // 5. 외부에서 전달된 sx를 마지막에 적용하여 덮어쓰기를 허용합니다.
                ...sx,
            }}
        >
            {children}
        </Typography>
    );
};

export default TitleXS;