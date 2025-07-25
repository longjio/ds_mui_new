// D:/ds_mui_new/src/components/form/FormTableRow.tsx

import React from 'react';
import { Box, SxProps, Theme, useTheme } from '@mui/material';
import { BodyM } from '../typography';

interface FormTableRowProps {
    /**
     * 행의 헤더(th)에 표시될 라벨 텍스트입니다.
     */
    label: string;
    /**
     * 행의 데이터(td)에 표시될 자식 요소(주로 Input)입니다.
     */
    children: React.ReactNode;
    /**
     * true로 설정하면 라벨 옆에 필수 입력을 나타내는 별표(*)가 표시됩니다.
     */
    required?: boolean;
    /**
     * 컴포넌트의 최상위 Box에 적용될 sx prop입니다.
     */
    sx?: SxProps<Theme>;
}

/**
 * 테이블의 th, td와 유사한 구조를 가진 폼 행 컴포넌트입니다.
 * 고정된 너비의 라벨(th)과 가변 너비의 입력 필드(td)로 구성됩니다.
 */
export const FormTableRow: React.FC<FormTableRowProps> = ({
                                                              label,
                                                              children,
                                                              required = false,
                                                              sx,
                                                          }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                borderBottom: `1px solid ${theme.palette.divider}`,
                // ★ 마지막 자식의 border-bottom을 제거하는 로직을 삭제합니다.
                ...sx,
            }}
        >
            {/* Label Area (th 역할) */}
            <Box
                component="label"
                sx={{
                    width: 170,
                    flexShrink: 0,
                    bgcolor: 'action.hover',
                    pl: 3,
                    display: 'flex',
                    alignItems: 'center',
                    borderRight: `1px solid ${theme.palette.divider}`,
                }}
            >
                <BodyM component="span" sx={{ fontWeight: 500 }}>
                    {label}
                    {required && (
                        <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>
                            *
                        </Box>
                    )}
                </BodyM>
            </Box>

            {/* Children Area (td 역할) */}
            <Box
                sx={{
                    flex: 1,
                    p: 1, // 입력 컴포넌트 주변의 여백
                    display: 'flex',
                    alignItems: 'center',
                    // 자식으로 오는 MUI Input 컴포넌트들의 높이를 36px로 조정합니다.
                    '& .MuiInputBase-root': {
                        height: '34px',
                    },
                    // 단, multiline TextField는 내용에 따라 높이가 변해야 하므로 예외 처리합니다.
                    '& .MuiInputBase-multiline': {
                        height: 'auto',
                    },
                }}
            >
                {children}
            </Box>
        </Box>
    );
};