import * as React from 'react';
import TextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

// TextFieldProps를 직접 확장하여 variant를 포함한 모든 MUI TextField props를 받을 수 있도록 합니다.
export type DsTextFieldProps = MuiTextFieldProps & {
    // DsTextField만의 고유한 props가 있다면 여기에 추가할 수 있습니다.
    // 예를 들어, DsTextField에서만 사용되는 새로운 prop을 정의할 수 있습니다.
    // customBehavior?: boolean;
};

export function DsTextField({
                                id: idFromProps, // props에서 오는 id
                                name: nameFromProps,
                                variant: variantFromProps,
                                ...rest // 나머지 props
                            }: DsTextFieldProps) {
    const id = idFromProps ?? 'ds-text-field';
    const name = nameFromProps ?? 'ds-text-field-name';
    const variant = variantFromProps ?? 'outlined';

    return (
        <TextField
            id={id}
            name={name}
            variant={variant}
            {...rest}
        />
    );
}
