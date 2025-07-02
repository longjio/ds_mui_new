// src/pages/DataGridPage.tsx

import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import DsDataGrid from '../components/mui_x/datagrid/DsDataGrid';
// 사용자 정의 타입을 가져옵니다. 이 타입들이 실제 MUI X DataGrid와 호환되는지 확인이 중요합니다.
import type { GridValueGetterParams, GridColDef } from '../types/mui-grid';

// 1. 행 데이터에 대한 인터페이스 정의
interface RowData {
    id: number;
    firstName: string | null; // firstName이 없을 수 있는 경우 null 허용
    lastName: string;
    age: number | null;      // age가 없을 수 있는 경우 null 허용
}

// 2. RowData 인터페이스를 GridColDef와 함께 사용
const columns: GridColDef<RowData>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: '이름 (First name)',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: '성 (Last name)',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: '나이 (Age)',
        type: 'number', // 사용자 정의 GridColDef에 'number' 타입이 GridColType으로 정의되어 있는지 확인
        width: 110,
        editable: true,
        align: 'left', // 사용자 정의 GridColDef에 'align' 속성이 정의되어 있는지 확인
        headerAlign: 'left', // 사용자 정의 GridColDef에 'headerAlign' 속성이 정의되어 있는지 확인
    },
    {
        field: 'fullName',
        headerName: '전체 이름 (Full name)',
        description: '이 열은 valueGetter를 사용하며 정렬할 수 없습니다.',
        sortable: false, // 사용자 정의 GridColDef에 'sortable' 속성이 정의되어 있는지 확인
        width: 180,
        valueGetter: (params: GridValueGetterParams<RowData>) => {
            // params 객체와 params.row가 유효한지 확인하여 런타임 에러 방지
            if (!params || typeof params.row === 'undefined') {
                console.warn('DataGridPage: "fullName" 컬럼의 valueGetter에서 params 또는 params.row가 undefined입니다.', params);
                return '정보 없음'; // 또는 빈 문자열 '' 등 적절한 기본값
            }
            // firstName이 null일 경우 빈 문자열로 처리
            const firstName = params.row.firstName || '';
            // lastName은 null을 허용하지 않지만, 일관성을 위해 빈 문자열 처리 (필요시)
            const lastName = params.row.lastName || '';
            return `${firstName} ${lastName}`.trim(); // 앞뒤 공백 제거
        },
    },
];

// 3. 행 데이터 배열에도 RowData 인터페이스를 사용하여 일관성 유지
const rows: RowData[] = [
    { id: 1, lastName: '스노우', firstName: '존', age: 35 },
    { id: 2, lastName: '래니스터', firstName: '세르세이', age: 42 },
    { id: 3, lastName: '래니스터', firstName: '제이미', age: 42 },
    { id: 4, lastName: '스타크', firstName: '아리아', age: 25 },
    { id: 5, lastName: '타르가르옌', firstName: '대너리스', age: null },
    { id: 6, lastName: '멜리산드레', firstName: null, age: 150 },
    { id: 7, lastName: '클리포드', firstName: '페라라', age: 44 },
    { id: 8, lastName: '프란시스', firstName: '로시니', age: 36 },
    { id: 9, lastName: '록시', firstName: '하비', age: 65 },
];

const DataGridPage = () => {
    return (
        <Stack spacing={4} sx={{ p: 3 }}>
            <Typography variant="h1" component="h1" gutterBottom>DataGrid
            </Typography>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    기본 DsDataGrid 예시
                </Typography>
                <DsDataGrid
                    rows={rows}
                    columns={columns}
                    // ✅ sx prop 제거
                />
            </Box>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    페이지 크기 옵션 변경 및 자동 높이 조절 예시
                </Typography>
                <DsDataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    autoHeight
                    checkboxSelection={false}
                    // ✅ sx prop 제거
                />
            </Box>
        </Stack>
    );
};

export default DataGridPage;