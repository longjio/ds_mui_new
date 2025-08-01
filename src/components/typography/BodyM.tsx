import React from 'react';
// ★ 1. TypographyProps와 테마 관련 타입을 import 합니다.
import { Typography, TypographyProps } from '@mui/material';
import { Theme, SxProps } from '@mui/material/styles';

interface BodyMProps extends Omit<TypographyProps, 'variant'> {
    // sx prop은 TypographyProps에 이미 포함되어 있습니다.
}

// ★ 3. sx, children, 그리고 나머지 props를 구조 분해하여 받습니다.
const BodyM = ({ sx, children, ...rest }: BodyMProps) => {
    // BodyM의 기본 스타일을 정의합니다.
    const defaultSx: SxProps<Theme> = {
        fontSize: '16px',
        fontWeight: 500,
        fontFamily: (theme) => theme.typography.fontFamily, // 테마에서 폰트 가져오기
        lineHeight: 1.5,
        color: (theme) => theme.palette.text.primary, // 테마에서 색상 가져오기
    };

    return (
        <Typography
            {...rest} // component="label", htmlFor 등 나머지 props 전달
            // ★ 4. 기본 스타일과 외부에서 받은 sx를 안전하게 병합합니다.
            sx={[defaultSx, ...(Array.isArray(sx) ? sx : [sx])]}
        >
            {children}
        </Typography>
    );
};

export default BodyM;