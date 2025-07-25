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
                                                   checkboxSelection = false, // ★ 1. prop 추가 및 기본값 false 설정
                                                   rowHeight = 38,
                                                   columnHeaderHeight = 40,
                                                   ...rest
                                               }) => {

    let processedColumns = columns.map(col => ({
        headerAlign: 'center' as const,
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
                return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
            },
        };
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