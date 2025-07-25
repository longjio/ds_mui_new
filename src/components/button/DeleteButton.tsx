// D:/ds_mui_new/src/components/button/DeleteButton.tsx
import React from 'react';
import { DsButton, DsButtonProps } from './DsButton';

/**
 * @description '삭제' 텍스트를 가진 표준 버튼입니다.
 */
export const DeleteButton: React.FC<DsButtonProps> = (props) => {
    return (
        <DsButton variant="outlined" color="error" {...props}>
            삭제
        </DsButton>
    );
};