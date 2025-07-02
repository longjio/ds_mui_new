import React from 'react';
import { Pagination, PaginationProps as MuiPaginationProps, Stack } from '@mui/material';

// DsPagination 컴포넌트가 받을 props 타입을 정의합니다.
// MUI의 PaginationProps를 확장하여 모든 기본 기능을 지원합니다.
interface DsPaginationProps extends MuiPaginationProps {
    // 추가적인 커스텀 prop이 필요하다면 여기에 정의할 수 있습니다.
    // 예: onPageSizeChange?: (size: number) => void;
}

/**
 * MUI Pagination이 제공하는 모든 props(count, color, variant, shape, disabled 등)를 지원합니다.
 */
const DsPagination: React.FC<DsPaginationProps> = ({ ...props }) => {
    return (
        <Stack spacing={2}>
            <Pagination {...props} />
        </Stack>
    );
};

export default DsPagination;