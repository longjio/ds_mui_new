// D:/ds_mui_new/src/components/form/FormField.tsx

import React from 'react';
import { Stack, StackProps } from '@mui/material';
import { BodyM } from '../typography';

interface FormFieldProps extends Omit<StackProps, 'direction' | 'spacing'> {
    /**
     * 필드의 라벨 텍스트입니다.
     */
    label: string;
    /**
     * 라벨과 연결될 입력 요소의 id입니다. 웹 접근성을 위해 필수입니다.
     */
    htmlFor: string;
}

/**
 * 라벨과 입력 요소를 조합하는 공통 레이아웃 컴포넌트입니다.
 * 이제 라벨은 디자인 시스템의 BodyM 컴포넌트를 사용합니다.
 */
export const FormField: React.FC<FormFieldProps> = ({
                                                        label,
                                                        htmlFor,
                                                        children,
                                                        sx,
                                                        ...rest
                                                    }) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            sx={{
                // ★ 라벨과 입력 요소 사이의 간격을 12px로 설정합니다.
                gap: '12px',
                // 자식으로 오는 MUI Input 컴포넌트들의 높이를 34px로 조정합니다.
                '& .MuiInputBase-root': {
                    height: '34px',
                },
                // 단, multiline TextField는 내용에 따라 높이가 변해야 하므로 예외 처리합니다.
                '& .MuiInputBase-multiline': {
                    height: 'auto',
                },
                ...sx,
            }}
            {...rest}
        >
            <BodyM
                component="label"
                htmlFor={htmlFor}
                sx={{
                    flexShrink: 0,
                    fontWeight: 500,
                }}
            >
                {label}
            </BodyM>
            {children}
        </Stack>
    );
};