import React, { useState } from 'react';
import { Box, Select, MenuItem, TextField } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

// 레이아웃 및 공통 컴포넌트 import
import { TitleArea, SearchArea, SubTitleArea } from '../layouts';
import { FormField } from '../components/form/FormField';
import { FormTableRow } from '../components/form/FormTableRow';
import DsDataGrid from '../components/mui_x/datagrid/DsDataGrid';
import {
    SearchIconButton,
    ResetButton,
    PrintButton,
    AddButton,
    DeleteButton,
    SaveButton,
} from '../components/button';

// --- 샘플 데이터 정의 ---

// 1. 왼쪽 메뉴 그리드 데이터
const menuGridRows = [
    { id: 1, menuName: '대시보드', order: 1, depth: 0, parentId: null },
    { id: 2, menuName: '컴포넌트', order: 2, depth: 0, parentId: null },
    { id: 3, menuName: '버튼', order: 1, depth: 1, parentId: 2 },
    { id: 4, menuName: '데이터 그리드', order: 2, depth: 1, parentId: 2 },
    { id: 5, menuName: '관리', order: 3, depth: 0, parentId: null },
    { id: 6, menuName: '사용자 관리', order: 1, depth: 1, parentId: 5 },
];

const menuGridColumns: GridColDef[] = [
    { field: 'depth', headerName: 'LEVEL', width: 80, align: 'center' },
    { field: 'id', headerName: '메뉴ID', width: 90, align: 'center' },
    { field: 'menuName', headerName: '메뉴명', flex: 1, minWidth: 150 },
    { field: 'parentId', headerName: '상위메뉴', width: 90, align: 'center' },
    { field: 'order', headerName: '정렬', type: 'number', width: 80, align: 'center' },
];

// 2. 중앙 상단 객체 그리드 데이터
const objectGridRows = [
    { id: 'OBJ001', name: 'User', actionUrl: '/api/users', logYn: 'Y' },
    { id: 'OBJ002', name: 'Product', actionUrl: '/api/products', logYn: 'Y' },
    { id: 'OBJ003', name: 'Order', actionUrl: '/api/orders', logYn: 'N' },
];
const objectGridColumns: GridColDef[] = [
    { field: 'id', headerName: '오브젝트ID', width: 100 },
    { field: 'name', headerName: '오브젝트명', flex: 1, minWidth: 120 },
    { field: 'actionUrl', headerName: '액션 URL', flex: 1.5, minWidth: 180 },
    { field: 'logYn', headerName: '로그', width: 80, align: 'center' },
];

// 3. 중앙 하단 속성 그리드 데이터
const propertyGridRows = [
    { id: 'SUB_OBJ01', name: 'UserDetails', actionUrl: '/api/users/details', logYn: 'N' },
    { id: 'SUB_OBJ02', name: 'ProductStock', actionUrl: '/api/products/stock', logYn: 'Y' },
    { id: 'SUB_OBJ03', name: 'OrderHistory', actionUrl: '/api/orders/history', logYn: 'Y' },
];
const propertyGridColumns: GridColDef[] = [
    { field: 'id', headerName: '오브젝트ID', width: 100 },
    { field: 'name', headerName: '오브젝트명', flex: 1, minWidth: 120 },
    { field: 'actionUrl', headerName: '액션 URL', flex: 1.5, minWidth: 180 },
    { field: 'logYn', headerName: '로그', width: 80, align: 'center' },
];

// 시스템 선택 옵션
const systemOptions = [
    { value: 'all', label: '전체' },
    { value: 'ds_mui_new', label: 'DS MUI NEW' },
    { value: 'legacy_system', label: '레거시 시스템' },
];

// 오른쪽 폼의 Select들을 위한 옵션 데이터
const objectSelectOptions = [
    { value: 'OBJ001', label: 'User' },
    { value: 'OBJ002', label: 'Product' },
    { value: 'OBJ003', label: 'Order' },
];

const actionTypeOptions = [
    { value: 'C', label: '생성(Create)' },
    { value: 'R', label: '조회(Read)' },
    { value: 'U', label: '수정(Update)' },
    { value: 'D', label: '삭제(Delete)' },
];

const logOptions = [
    { value: 'Y', label: '사용' },
    { value: 'N', label: '미사용' },
];

export default function MenuObjPage() {
    // 조회 조건 State
    const [system, setSystem] = useState('all');
    const [menuId, setMenuId] = useState('');
    const [menuName, setMenuName] = useState('');

    // 오른쪽 상단 "기본 OBJ" 폼 State
    const [selectedObject, setSelectedObject] = useState('');
    const [objectName, setObjectName] = useState('');
    const [actionUrl, setActionUrl] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [actionType, setActionType] = useState('');
    const [logYn, setLogYn] = useState('');

    // 오른쪽 하단 "추가 OBJ" 폼 State
    const [propertyId, setPropertyId] = useState('');
    const [propertyName, setPropertyName] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [propertyDefault, setPropertyDefault] = useState('');

    const handleSearch = () => {
        alert(`검색 조건:\n시스템: ${system}\n메뉴ID: ${menuId}\n메뉴명: ${menuName}`);
    };

    const handleReset = () => {
        setSystem('all');
        setMenuId('');
        setMenuName('');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3, boxSizing: 'border-box' }}>
            {/* --- 상단 제목 및 조회 영역 --- */}
            <TitleArea title="메뉴 OBJ 관리">
                <PrintButton onClick={() => alert('인쇄 버튼 클릭')} />
                <ResetButton onClick={handleReset} />
            </TitleArea>

            <SearchArea>
                <FormField label="시스템" htmlFor="system-select">
                    <Select id="system-select" value={system} onChange={(e) => setSystem(e.target.value)} sx={{ width: '180px' }}>
                        {systemOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormField>
                <SearchIconButton onClick={handleSearch} />
            </SearchArea>

            {/* --- 하단 4:3:3 비율의 메인 콘텐츠 영역 --- */}
            <Box sx={{ display: 'flex', flexGrow: 1, gap: 3, overflow: 'hidden' }}>

                {/* --- 왼쪽 영역 (4) - 메뉴 그리드 --- */}
                <Box sx={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
                    <SubTitleArea title="메뉴 목록">
                    </SubTitleArea>
                    <DsDataGrid
                        rows={menuGridRows}
                        columns={menuGridColumns}
                        sx={{ flexGrow: 1 }}
                        hideFooter
                        showRowNumber // 'No' 컬럼 표시
                    />
                </Box>

                {/* --- 중앙 영역 (3) - 객체/속성 그리드 --- */}
                <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* 중앙 상단 */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <SubTitleArea title="OBJ 기본리스트">
                        </SubTitleArea>
                        <DsDataGrid
                            rows={objectGridRows}
                            columns={objectGridColumns}
                            sx={{ flexGrow: 1 }}
                            hideFooter
                            showRowNumber
                        />
                    </Box>
                    {/* 중앙 하단 */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <SubTitleArea title="OBJ 추가리스트">
                        </SubTitleArea>
                        <DsDataGrid
                            rows={propertyGridRows}
                            columns={propertyGridColumns}
                            sx={{ flexGrow: 1 }}
                            hideFooter
                            showRowNumber
                        />
                    </Box>
                </Box>

                {/* --- 오른쪽 영역 (3) - 상세 정보 입력 폼 --- */}
                <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* ★ 오른쪽 상단: flex: 1을 적용하여 높이를 채웁니다. */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <SubTitleArea title="기본 OBJ">
                            <AddButton onClick={() => {}} />
                            <DeleteButton onClick={() => {}} />
                            <SaveButton onClick={() => {}} />
                        </SubTitleArea>
                        {/* ★ flexGrow: 1을 적용하여 내용이 영역을 채우도록 합니다. */}
                        <Box sx={{ border: '1px solid', borderColor: 'divider', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <FormTableRow label="오브젝트" required>
                                <Select fullWidth value={selectedObject} onChange={(e) => setSelectedObject(e.target.value as string)}>
                                    {objectSelectOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormTableRow>
                            <FormTableRow label="오브젝트명" required>
                                <TextField fullWidth variant="outlined" value={objectName} onChange={(e) => setObjectName(e.target.value)} />
                            </FormTableRow>
                            <FormTableRow label="액션 URL" required>
                                <TextField fullWidth variant="outlined" value={actionUrl} onChange={(e) => setActionUrl(e.target.value)} />
                            </FormTableRow>
                            <FormTableRow label="정렬순번" required>
                                <TextField fullWidth variant="outlined" type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
                            </FormTableRow>
                            <FormTableRow label="동작구분" required>
                                <Select fullWidth value={actionType} onChange={(e) => setActionType(e.target.value as string)}>
                                    {actionTypeOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                </Select>
                            </FormTableRow>
                            <FormTableRow label="로그" required>
                                <Select fullWidth value={logYn} onChange={(e) => setLogYn(e.target.value as string)}>
                                    {logOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                </Select>
                            </FormTableRow>
                        </Box>
                    </Box>
                    {/* ★ 오른쪽 하단: flex: 1을 적용하여 높이를 채웁니다. */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <SubTitleArea title="추가 OBJ">
                            <AddButton onClick={() => {}} />
                            <DeleteButton onClick={() => {}} />
                            <SaveButton onClick={() => {}} />
                        </SubTitleArea>
                        {/* ★ flexGrow: 1을 적용하여 내용이 영역을 채우도록 합니다. */}
                        <Box sx={{ border: '1px solid', borderColor: 'divider', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <FormTableRow label="오브젝트" required>
                                <Select fullWidth value={selectedObject} onChange={(e) => setSelectedObject(e.target.value as string)}>
                                    {objectSelectOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormTableRow>
                            <FormTableRow label="오브젝트명" required>
                                <TextField fullWidth variant="outlined" value={objectName} onChange={(e) => setObjectName(e.target.value)} />
                            </FormTableRow>
                            <FormTableRow label="액션 URL" required>
                                <TextField fullWidth variant="outlined" value={actionUrl} onChange={(e) => setActionUrl(e.target.value)} />
                            </FormTableRow>
                            <FormTableRow label="정렬순번" required>
                                <TextField fullWidth variant="outlined" type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
                            </FormTableRow>
                            <FormTableRow label="동작구분" required>
                                <Select fullWidth value={actionType} onChange={(e) => setActionType(e.target.value as string)}>
                                    {actionTypeOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                </Select>
                            </FormTableRow>
                            <FormTableRow label="로그" required>
                                <Select fullWidth value={logYn} onChange={(e) => setLogYn(e.target.value as string)}>
                                    {logOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                                </Select>
                            </FormTableRow>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
}