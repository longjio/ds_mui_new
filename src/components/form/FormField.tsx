// D:/ds_mui_new/src/components/form/FormField.tsx

import React from 'react';
import { Stack, StackProps, TypographyProps } from '@mui/material';
import { BodyM } from '../typography';

// BodyM 컴포넌트가 htmlFor prop을 받을 수 있도록 타입을 확장합니다.
// BodyM이 Typography를 기반으로 한다고 가정합니다.
interface ExtendedBodyMProps extends TypographyProps {
    htmlFor?: string;
}

interface FormFieldProps extends Omit<StackProps, 'direction' | 'spacing'> {
    label: string;
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
    // --- ★★★ 핵심 수정 사항 (1/2) ★★★ ---
    // BodyM 컴포넌트를 label로 사용하기 위해 확장된 타입으로 단언합니다.
    const LabelComponent = BodyM as React.FC<ExtendedBodyMProps>;

    return (
        <Stack
            direction="row"
            alignItems="center"
            sx={{
                gap: '12px',
                '& .MuiInputBase-root': {
                    height: '34px',
                },
                '& .MuiInputBase-multiline': {
                    height: 'auto',
                },
                ...sx,
            }}
            {...rest}
        >
            {/* --- ★★★ 핵심 수정 사항 (2/2) ★★★ --- */}
            {/* 기존 BodyM 대신 타입 단언된 LabelComponent를 사용합니다. */}
            <LabelComponent
                component="label"
                htmlFor={htmlFor}
                sx={{
                    flexShrink: 0,
                    fontWeight: 500,
                }}
            >
                {label}
            </LabelComponent>
            {children}
        </Stack>
    );
};