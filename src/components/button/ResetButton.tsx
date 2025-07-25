// D:/ds_mui_new/src/components/button/ResetButton.tsx
import React from 'react';
import { DsButton, DsButtonProps } from './DsButton';
import ReplayIcon from '@mui/icons-material/Replay'; // '초기화'에 어울리는 아이콘으로 변경

/**
 * @description '초기화' 아이콘과 텍스트를 가진 표준 버튼입니다.
 */
export const ResetButton: React.FC<DsButtonProps> = (props) => {
    return (
        <DsButton variant="outlined" startIcon={<ReplayIcon />} {...props}>
            초기화
        </DsButton>
    );
};