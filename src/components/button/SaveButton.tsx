// D:/ds_mui_new/src/components/button/SaveButton.tsx
import React from 'react';
import { DsButton, DsButtonProps } from './DsButton';

/**
 * @description '저장' 텍스트를 가진 표준 버튼입니다.
 */
export const SaveButton: React.FC<DsButtonProps> = (props) => {
    return (
        <DsButton variant="contained" {...props}>
            저장
        </DsButton>
    );
};