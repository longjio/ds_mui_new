// D:/ds_mui_new/src/template/UserMenu.tsx

import React, { useState } from 'react';
import { Box, TextField, IconButton, Select, MenuItem } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// 레이아웃 및 공통 컴포넌트 import
import { TitleArea, SearchArea, SubTitleArea } from '../layouts';
import { FormField } from '../components/form/FormField';
import { FormTableRow } from '../components/form/FormTableRow';
import DsDataGrid from '../components/mui_x/datagrid/DsDataGrid';
import DsCheckbox from '../components/input/DsCheckbox'; // ★ DsCheckbox import
import {
    SearchIconButton,
    ResetButton,
    SaveButton,
} from '../components/button';

// --- 샘플 데이터 정의 ---

// 1. 상단 사용자 그리드 데이터
const userGridRows = [
    { id: 'user001', loginId: 'gildong', name: '홍길동', companyCode: 'C001' },
    { id: 'user002', loginId: 'sunsin', name: '이순신', companyCode: 'C002' },
    { id: 'user003', loginId: 'gwansun', name: '유관순', companyCode: 'C003' },
    { id: 'user004', loginId: 'sejong', name: '세종대왕', companyCode: 'C001' },
];

// 1. 상단 사용자 그리드 컬럼 정의
const userGridColumns: GridColDef[] = [
    { field: 'id', headerName: '사용자번호', width: 120 },
    { field: 'loginId', headerName: '로그인', flex: 1, minWidth: 120 },
    { field: 'name', headerName: '이름', flex: 1, minWidth: 120 },
    { field: 'companyCode', headerName: '회사코드', flex: 1, minWidth: 120 },
];

// 2. 하단 좌측 전체 메뉴 그리드 데이터
const allMenuGridRows = [
    { id: 'menu01', name: '대시보드', system: 'DS MUI NEW', order: 1, depth: 0 },
    { id: 'menu02', name: '사용자 관리', system: 'DS MUI NEW', order: 2, depth: 0 },
    { id: 'menu03', name: '메뉴 관리', system: 'DS MUI NEW', order: 3, depth: 0 },
    { id: 'menu04', name: '공통코드 관리', system: 'DS MUI NEW', order: 4, depth: 1 },
    { id: 'menu05', name: '제품 관리', system: 'DS MUI NEW', order: 5, depth: 1 },
    { id: 'menu06', name: '주문 관리', system: 'DS MUI NEW', order: 6, depth: 1 },
];

// 2. 하단 좌측 전체 메뉴 그리드 컬럼 정의
const allMenuGridColumns: GridColDef[] = [
    { field: 'depth', headerName: 'LEVEL', width: 80, align: 'center' },
    { field: 'system', headerName: '시스템', width: 120 },
    { field: 'id', headerName: '메뉴ID', width: 100 },
    { field: 'name', headerName: '메뉴명', flex: 1, minWidth: 150 },
    { field: 'order', headerName: '순번', width: 60, align: 'center' },
];

// 3. 하단 중앙 사용자별 메뉴 그리드 데이터
const userMenuGridRows = [
    { id: 'menu01', name: '대시보드', system: 'DS MUI NEW', order: 1, depth: 0, canSearch: 'Y', canSave: 'N', canExcel: 'N', canPrint: 'Y' },
    { id: 'menu02', name: '사용자 관리', system: 'DS MUI NEW', order: 2, depth: 0, canSearch: 'Y', canSave: 'Y', canExcel: 'Y', canPrint: 'N' },
];

// 3. 하단 중앙 사용자별 메뉴 그리드 컬럼 정의
const userMenuGridColumns: GridColDef[] = [
    { field: 'depth', headerName: 'LEVEL', width: 80, align: 'center' },
    { field: 'system', headerName: '시스템', width: 120 },
    { field: 'id', headerName: '메뉴ID', width: 100 },
    { field: 'name', headerName: '메뉴명', flex: 1, minWidth: 150 },
    { field: 'order', headerName: '순번', width: 60, align: 'center' },
    { field: 'canSearch', headerName: '조회', width: 60, align: 'center' },
    { field: 'canSave', headerName: '저장', width: 60, align: 'center' },
    { field: 'canExcel', headerName: '엑셀', width: 60, align: 'center' },
    { field: 'canPrint', headerName: '인쇄', width: 60, align: 'center' },
];

// 조회 영역 Select를 위한 옵션 데이터 추가
const companyOptions = [
    { value: 'all', label: '전체' },
    { value: 'C001', label: '본사' },
    { value: 'C002', label: '자회사 A' },
    { value: 'C003', label: '자회사 B' },
];

const systemOptions = [
    { value: 'all', label: '전체' },
    { value: 'ds_mui_new', label: 'DS MUI NEW' },
    { value: 'legacy_system', label: '레거시 시스템' },
];


export default function UserMenuPage() {
    // 조회 조건 State 수정
    const [searchCompany, setSearchCompany] = useState('all');
    const [searchSystem, setSearchSystem] = useState('all');

    // 오른쪽 상세 정보 폼 State
    const [formState, setFormState] = useState({
        system: 'DS MUI NEW',
        menuId: 'menu02',
        menuName: '사용자 관리',
        canSearch: true,
        canSave: true,
        canExcel: true,
        canPrint: false,
    });

    // handleSearch 수정
    const handleSearch = () => {
        alert(`검색 조건:\n회사: ${searchCompany}\n시스템: ${searchSystem}`);
    };

    // handleReset 수정
    const handleReset = () => {
        setSearchCompany('all');
        setSearchSystem('all');
    };

    // 권한 Checkbox 변경 핸들러
    const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({
            ...prev,
            [event.target.name]: event.target.checked,
        }));
    };

    // 셔틀 버튼 스타일
    const shuttleButtonStyle = {
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 0,
        width: '32px',
        height: '32px',
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3, boxSizing: 'border-box' }}>
            {/* --- 상단 제목 및 조회 영역 --- */}
            <TitleArea title="사용자별 메뉴 관리">
                <ResetButton onClick={handleReset} />
            </TitleArea>

            {/* SearchArea 수정 */}
            <SearchArea>
                <FormField label="회사" htmlFor="company-search">
                    <Select id="company-search" value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} sx={{ width: '200px' }}>
                        {companyOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormField>
                <FormField label="시스템" htmlFor="system-search">
                    <Select id="system-search" value={searchSystem} onChange={(e) => setSearchSystem(e.target.value)} sx={{ width: '200px' }}>
                        {systemOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormField>
                <SearchIconButton onClick={handleSearch} />
            </SearchArea>

            {/* --- 메인 콘텐츠 영역 (수평 분할) --- */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', gap: 3, mt: 3, overflow: 'hidden' }}>

                {/* --- 왼쪽 영역 (flex: 9) --- */}
                <Box sx={{ flex: 9, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>

                    {/* --- 왼쪽 상단: 사용자 그리드 --- */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                        <SubTitleArea title="사용자 목록" />
                        <DsDataGrid
                            rows={userGridRows}
                            columns={userGridColumns}
                            sx={{ flexGrow: 1 }}
                            showRowNumber
                            hideFooter
                        />
                    </Box>

                    {/* --- 왼쪽 하단: 셔틀 그리드 영역 --- */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 3, minHeight: 0, alignItems: 'center' }}>
                        {/* 전체프로그램 그리드 */}
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, alignSelf: 'stretch' }}>
                            <SubTitleArea title="전체프로그램" />
                            <DsDataGrid
                                rows={allMenuGridRows}
                                columns={allMenuGridColumns}
                                sx={{ flexGrow: 1 }}
                                showRowNumber
                                checkboxSelection
                                hideFooter
                            />
                        </Box>

                        {/* 셔틀 버튼 */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                            <IconButton color="primary" aria-label="move selected right" sx={shuttleButtonStyle}>
                                <ChevronRightIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="move selected left" sx={shuttleButtonStyle}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Box>

                        {/* 등록된 프로그램 그리드 */}
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, alignSelf: 'stretch' }}>
                            <SubTitleArea title="등록된 프로그램">
                            </SubTitleArea>
                            <DsDataGrid
                                rows={userMenuGridRows}
                                columns={userMenuGridColumns}
                                sx={{ flexGrow: 1 }}
                                showRowNumber
                                checkboxSelection
                                hideFooter
                            />
                        </Box>
                    </Box>
                </Box>

                {/* --- 오른쪽 영역 (flex: 3) --- */}
                <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <SubTitleArea title="메뉴 상세">
                        <SaveButton onClick={() => {}} />
                    </SubTitleArea>
                    <Box sx={{ border: '1px solid', borderColor: 'divider', flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                        <FormTableRow label="시스템" required>
                            <TextField fullWidth variant="outlined" value={formState.system} InputProps={{ readOnly: true }} />
                        </FormTableRow>
                        <FormTableRow label="메뉴ID" required>
                            <TextField fullWidth variant="outlined" value={formState.menuId} InputProps={{ readOnly: true }} />
                        </FormTableRow>
                        <FormTableRow label="메뉴명" required>
                            <TextField fullWidth variant="outlined" value={formState.menuName} InputProps={{ readOnly: true }} />
                        </FormTableRow>
                        {/* ★ Checkbox를 DsCheckbox로 수정 */}
                        <FormTableRow label="조회">
                            <DsCheckbox name="canSearch" checked={formState.canSearch} onChange={handlePermissionChange} />
                        </FormTableRow>
                        <FormTableRow label="저장">
                            <DsCheckbox name="canSave" checked={formState.canSave} onChange={handlePermissionChange} />
                        </FormTableRow>
                        <FormTableRow label="엑셀">
                            <DsCheckbox name="canExcel" checked={formState.canExcel} onChange={handlePermissionChange} />
                        </FormTableRow>
                        <FormTableRow label="인쇄">
                            <DsCheckbox name="canPrint" checked={formState.canPrint} onChange={handlePermissionChange} />
                        </FormTableRow>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
}