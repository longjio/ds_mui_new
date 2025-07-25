// D:/ds_mui_new/src/components/button/DeleteButton.tsx
import React from 'react';
import { DsButton, DsButtonProps } from './DsButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

/**
 * @description '삭제' 아이콘과 텍스트를 가진 표준 버튼입니다.
 * 중요한 액션임을 나타내기 위해 outlined 스타일을 사용합니다.
 */
export const DeleteButton: React.FC<DsButtonProps> = (props) => {
    return (
        <DsButton variant="outlined" color="error" startIcon={<DeleteOutlineIcon />} {...props}>
            삭제
        </DsButton>
    );
};