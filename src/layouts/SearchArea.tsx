// D:/ds_mui_new/src/layouts/SearchArea.tsx

import React from 'react';
import { Stack, StackProps, useTheme } from '@mui/material';

/**
 * 조회 영역을 위한 공통 컨테이너 컴포넌트입니다.
 * 1px 테두리와 상하 패딩을 기본으로 가집니다.
 * MUI Stack의 모든 props를 지원하여 유연하게 사용할 수 있습니다.
 * @param props - MUI Stack의 모든 props를 지원합니다.
 */
export const SearchArea: React.FC<StackProps> = ({
                                                     direction = 'row',
                                                     // ★ 1. spacing prop은 더 이상 사용하지 않으므로 제거합니다.
                                                     alignItems = 'center',
                                                     sx,
                                                     ...rest
                                                 }) => {
    const theme = useTheme();

    return (
        <Stack
            {...rest}
            direction={direction}
            alignItems={alignItems}
            sx={{
                // --- 컴포넌트 자체의 기본 스타일 ---
                width: '100%',
                paddingY: 2,
                paddingLeft: 6,
                paddingRight: 0,
                border: `1px solid ${theme.palette.divider}`,
                mb: 3,

                // 자식 요소들의 간격을 직접 제어하는 스타일을 추가
                '& > *:not(:last-child)': {
                    marginRight: '30px',
                },

                // 외부에서 전달된 sx를 마지막에 적용하여 덮어쓰기(override)를 허용합니다.
                ...sx,
            }}
        />
    );
};