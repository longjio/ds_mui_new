// src/components/mui_x/datagrid/DsDataGrid.tsx
import React from 'react';
import {
    DataGrid as MuiDataGrid,
    DataGridProps,
    GridColDef,
} from '@mui/x-data-grid';
import { SxProps, Theme } from '@mui/material';

export interface DsDataGridProps extends Omit<DataGridProps, 'sx'> {
    sx?: SxProps<Theme>;
    /**
     * true로 설정하면 그리드 맨 앞에 'No' 컬럼이 자동으로 추가됩니다.
     */
    showRowNumber?: boolean;
    /**
     * true로 설정하면 그리드 맨 앞에 체크박스가 추가됩니다.
     * @default false
     */
    checkboxSelection?: boolean;
}

const DsDataGrid: React.FC<DsDataGridProps> = ({
                                                   rows,
                                                   columns,
                                                   sx,
                                                   showRowNumber = false,
                                                   checkboxSelection = false,
                                                   rowHeight = 38,
                                                   columnHeaderHeight = 40,
                                                   ...rest
                                               }) => {

    // --- ★★★ 핵심 수정 사항 ★★★ ---
    // processedColumns의 타입을 GridColDef[]로 명시하여 타입 추론 문제를 해결합니다.
    const processedColumns: GridColDef[] = columns.map(col => ({
        headerAlign: 'center',
        ...col,
    }));

    if (showRowNumber) {
        const rowNumberColumn: GridColDef = {
            field: 'no',
            headerName: 'No',
            width: 50,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return (params.api.getRowIndexRelativeToVisibleRows(params.id) ?? 0) + 1;
            },
        };
        // 이제 rowNumberColumn과 processedColumns의 요소 타입이 호환됩니다.
        processedColumns.unshift(rowNumberColumn);
    }

    return (
        <MuiDataGrid
            rows={rows}
            columns={processedColumns}
            rowHeight={rowHeight}
            columnHeaderHeight={columnHeaderHeight}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection={checkboxSelection}
            {...rest}
            sx={{
                width: '100%',
                borderRadius: 0,
                ...sx,
            }}
        />
    );
};

export default DsDataGrid;