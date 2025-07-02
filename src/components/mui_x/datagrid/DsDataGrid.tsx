// src/components/mui_x/datagrid/DsDataGrid.tsx
import React from 'react';
import {
    DataGrid as MuiDataGrid,
    GridColDef,
    GridRowsProp,
} from '@mui/x-data-grid';
import { Box, SxProps, Theme } from '@mui/material'; // ✅ SxProps와 Theme를 직접 import

// ✅ FIX: 복잡한 MuiDataGridProps 상속 대신, 필요한 props만 명시적으로 정의합니다.
// 이렇게 하면 타입 충돌의 원인이 되는 'sx' prop 상속을 피할 수 있습니다.
export interface DsDataGridProps {
    rows: GridRowsProp;
    columns: GridColDef[];
    sx?: SxProps<Theme>; // ✅ 타입을 명확하게 지정하여 충돌을 해결합니다.
    // MUI DataGrid에서 사용하는 다른 모든 props를 받을 수 있도록 추가
    [key: string]: any;
}

const DsDataGrid: React.FC<DsDataGridProps> = ({ rows, columns, sx, ...rest }) => {
    return (
        <Box sx={{ height: 400, width: '100%', ...sx }}>
            <MuiDataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                {...rest} // 나머지 모든 props를 전달합니다.
            />
        </Box>
    );
};

export default DsDataGrid;