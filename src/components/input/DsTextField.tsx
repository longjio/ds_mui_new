// D:/ds_mui_new/src/components/input/DsTextField.tsx

import * as React from 'react';
import TextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { SxProps, Theme } from '@mui/material/styles';

export type DsTextFieldProps = MuiTextFieldProps;

export function DsTextField({
                                id: idFromProps,
                                name: nameFromProps,
                                variant: variantFromProps,
                                size: sizeFromProps,
                                sx: sxFromProps,
                                multiline,
                                ...rest
                            }: DsTextFieldProps) {
    const id = idFromProps ?? 'ds-text-field';
    const name = nameFromProps ?? 'ds-text-field-name';
    const variant = variantFromProps ?? 'outlined';
    const size = sizeFromProps ?? 'medium';

    // 'medium' 사이즈일 때만 적용할 커스텀 높이 스타일을 정의합니다.
    const mediumSizeSx: SxProps<Theme> = {
        // multiline이 아닐 경우에만 스타일을 적용합니다.
        ...(!multiline && {
            // 1. 루트 컨테이너의 높이를 50px로 고정합니다.
            '& .MuiOutlinedInput-root': {
                height: '50px',
            },
            // 2. 라벨의 line-height를 줄여서 수직으로 뜨는 현상을 막고,
            //    transform으로 위치를 재조정합니다.
            '& .MuiInputLabel-root': {
                // 라벨 자체의 높이를 텍스트 크기에 맞게 줄여 정렬 문제의 원인을 제거합니다.
                lineHeight: '1.2em',
                // 50px 높이의 중앙으로 위치를 다시 계산하여 이동시킵니다.
                transform: 'translate(14px, 16px) scale(1)',
            },
            // 3. 포커스 시 축소되는 라벨의 위치도 보정합니다.
            '& .MuiInputLabel-shrink': {
                // 이 값은 테두리 위에 정확히 위치하도록 조정된 값입니다.
                transform: 'translate(14px, -9px) scale(0.75)',
            },
        }),
    };

    return (
        <TextField
            id={id}
            name={name}
            variant={variant}
            size={size}
            multiline={multiline}
            sx={{
                ...(size === 'medium' && mediumSizeSx),
                // ★★★ 핵심 수정 사항 ★★★
                // required prop이 true일 경우, 라벨의 별표(*) 색상을 빨간색으로 변경합니다.
                ...(rest.required && {
                    '& .MuiFormLabel-asterisk': {
                        color: 'error.main',
                    },
                }),
                ...sxFromProps,
            }}
            {...rest}
        />
    );
}