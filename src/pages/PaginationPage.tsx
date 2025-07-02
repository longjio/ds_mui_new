import React, { useState } from 'react';
import { Box, Typography, TablePagination } from '@mui/material';
import DsPagination from '../components/navigation/DsPagination';

// 각 페이지네이션의 상태를 관리할 객체의 타입을 정의합니다.
interface PageState {
    basic: number;
    coloredPrimary: number;
    coloredSecondary: number;
    outlined: number;
    rounded: number;
    withButtons: number;
    withoutButtons: number;
}

const PaginationPage = () => {
    // 일반 Pagination 예제들의 상태
    const [pages, setPages] = useState<PageState>({
        basic: 1,
        coloredPrimary: 1,
        coloredSecondary: 1,
        outlined: 1,
        rounded: 1,
        withButtons: 1,
        withoutButtons: 1,
    });

    // TablePagination 예제를 위한 별도의 상태
    const [tablePage, setTablePage] = useState(0); // TablePagination은 0부터 시작합니다.
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // 일반 Pagination을 위한 핸들러
    const handleChange = (key: keyof PageState, event: React.ChangeEvent<unknown>, value: number) => {
        setPages(prevPages => ({
            ...prevPages,
            [key]: value,
        }));
    };

    // TablePagination 페이지 변경 핸들러
    const handleChangeTablePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setTablePage(newPage);
    };

    // TablePagination 페이지당 행 수 변경 핸들러
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setTablePage(0); // 페이지당 행 수가 바뀌면 첫 페이지로 리셋합니다.
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h1" gutterBottom>
                Pagination
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Pagination 컴포넌트를 사용하면 긴 데이터 목록을 여러 페이지로 나눌 수 있습니다.
            </Typography>

            {/* --- 예제 1: 기본 Pagination --- */}
            <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
                Basic (Current: {pages.basic})
            </Typography>
            <DsPagination
                count={10}
                page={pages.basic}
                onChange={(e, value) => handleChange('basic', e, value)}
            />

            {/* --- 예제 2: 색상 적용 --- */}
            <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
                Colored (Primary: {pages.coloredPrimary}, Secondary: {pages.coloredSecondary})
            </Typography>
            <DsPagination
                count={10}
                color="primary"
                page={pages.coloredPrimary}
                onChange={(e, value) => handleChange('coloredPrimary', e, value)}
            />
            <DsPagination
                count={10}
                color="secondary"
                page={pages.coloredSecondary}
                onChange={(e, value) => handleChange('coloredSecondary', e, value)}
            />

            {/* --- 예제 3: 외곽선 스타일 --- */}
            <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
                Outlined (Current: {pages.outlined})
            </Typography>
            <DsPagination
                count={10}
                variant="outlined"
                color="primary"
                page={pages.outlined}
                onChange={(e, value) => handleChange('outlined', e, value)}
            />

            {/* --- 예제 4: 둥근 모양 --- */}
            <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
                Rounded (Current: {pages.rounded})
            </Typography>
            <DsPagination
                count={10}
                variant="outlined"
                color="secondary"
                shape="rounded"
                page={pages.rounded}
                onChange={(e, value) => handleChange('rounded', e, value)}
            />

            {/* --- 예제 5: 비활성화 --- */}
            <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
                Disabled
            </Typography>
            <DsPagination count={10} disabled />

            {/* --- 예제 6: 추가 버튼 --- */}
            <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
                Additional Buttons
            </Typography>
            <DsPagination
                count={10}
                showFirstButton
                showLastButton
                page={pages.withButtons}
                onChange={(e, value) => handleChange('withButtons', e, value)}
            />
            <DsPagination
                count={10}
                hidePrevButton
                hideNextButton
                page={pages.withoutButtons}
                onChange={(e, value) => handleChange('withoutButtons', e, value)}
            />

            {/* --- 예제 7: 테이블 페이지네이션 (새로 추가) --- */}
            <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
                Table Pagination
            </Typography>
            <Box sx={{ maxWidth: 400 }}>
                <TablePagination
                    component="div"
                    count={100}
                    page={tablePage}
                    onPageChange={handleChangeTablePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
};

export default PaginationPage;