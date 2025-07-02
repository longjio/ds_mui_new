// src/components/typography/TitleM.tsx
import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { Theme, SxProps } from '@mui/material/styles';

interface TitleMProps extends Omit<TypographyProps, 'variant'> {
    // sx prop은 TypographyProps에 이미 포함되어 있습니다.
}

const TitleM = ({ sx, children, ...rest }: TitleMProps) => {
    const defaultSx: SxProps<Theme> = {
        fontSize: '26px', // TitleM 고유 스타일
        fontWeight: 600,   // TitleM 고유 스타일
        fontFamily: (theme) => theme.typography.fontFamily, // theme.ts에서 fontFamily 참조
        color: (theme) => theme.palette.text.primary, // theme.ts에서 색상 참조 (예시)
        // ... 기타 TitleM 기본 스타일
    };

    return (
        <Typography
            {...rest}
            sx={[defaultSx, ...(Array.isArray(sx) ? sx : [sx])]}
        >
            {children}
        </Typography>
    );
};

export default TitleM;