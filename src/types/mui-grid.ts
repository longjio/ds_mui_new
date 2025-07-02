// src/types/mui-grid.ts

// Data Grid에서 공통적으로 사용될 수 있는 Row ID 타입
export type GridRowId = number | string;

// MUI X DataGrid에서 허용하는 컬럼 타입 정의
export type GridColType =
    | 'string'
    | 'number'
    | 'date'
    | 'dateTime'
    | 'boolean'
    | 'singleSelect'
    | 'actions';
// 필요에 따라 더 많은 GridColType을 여기에 추가할 수 있습니다.
// (예: 'custom', 만약 커스텀 타입을 사용한다면)

// GridValueGetterParams를 제네릭으로 만듭니다.
export interface GridValueGetterParams<R = any, V = any> {
    id: GridRowId;
    field: string;
    value: V;
    row: R;
    colDef: GridColDef<R, V>; // colDef도 제네릭 타입을 사용하도록 합니다.
    api: any;
    getValue: (field: string) => any;
}

// GridColDef 인터페이스를 정의합니다.
export interface GridColDef<R = any, V = any, F = V> {
    field: string;
    headerName?: string;
    width?: number;
    editable?: boolean;
    type?: GridColType | undefined;
    align?: 'left' | 'right' | 'center';
    headerAlign?: 'left' | 'right' | 'center';
    description?: string;
    sortable?: boolean;
    valueGetter?: (params: GridValueGetterParams<R, V>) => F;
    // DataGridPage.tsx에서 사용하는 다른 GridColDef 속성들을 여기에 추가할 수 있습니다.
    // 예: renderCell, filterable 등
}