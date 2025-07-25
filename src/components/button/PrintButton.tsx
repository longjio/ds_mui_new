// D:/ds_mui_new/src/components/button/PrintButton.tsx
import React from 'react';
import { DsButton, DsButtonProps } from './DsButton';
import PrintIcon from '@mui/icons-material/Print';

/**
 * @description '인쇄' 아이콘과 텍스트를 가진 표준 버튼입니다.
 */
export const PrintButton: React.FC<DsButtonProps> = (props) => {
    return (
        <DsButton variant="outlined" startIcon={<PrintIcon />} {...props}>
            인쇄
        </DsButton>
    );
};