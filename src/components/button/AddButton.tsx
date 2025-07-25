import React from 'react';
import { DsButton, DsButtonProps } from './DsButton';

/**
 * @description '추가' 텍스트를 가진 표준 버튼입니다.
 */
export const AddButton: React.FC<DsButtonProps> = (props) => {
    // ★ variant를 'outlined'로 변경하고, primary color를 명시합니다.
    return (
        <DsButton variant="outlined" color="primary" {...props}>
            추가
        </DsButton>
    );
};