// D:/ds_mui_new/src/components/mui_x/datagrid/DsDataGrid.tsx

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
            // ★★★ 핵심 수정 사항 ★★★
            // sx prop을 배열 형태로 변경하여 기본 스타일과 외부 스타일을 안전하게 병합합니다.
            sx={[
                // 기본 스타일
                (theme) => ({
                    width: '100%',
                    borderRadius: 0,
                    // 모바일 화면(sm 이하)에서 컬럼 구분선을 숨깁니다.
                    [theme.breakpoints.down('sm')]: {
                        '& .MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },
                    },
                }),
                // 외부에서 전달된 sx prop이 존재할 경우에만 배열에 추가합니다.
                // sx가 배열일 수도 있으므로, Array.isArray로 확인하여 안전하게 펼칩니다.
                ...(sx ? (Array.isArray(sx) ? sx : [sx]) : []),
            ]}
        />
    );
};

export default DsDataGrid;