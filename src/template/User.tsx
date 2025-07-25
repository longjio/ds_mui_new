// D:/ds_mui_new/src/template/User.tsx

import React, { useState } from 'react';
import { Box, Select, MenuItem, TextField, SelectChangeEvent } from '@mui/material';
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

// 1. 좌측 사용자 그리드 데이터
const userGridRows = [
    { id: 'user001', loginId: 'user001', name: '홍길동', system: 'DS MUI NEW', company: '본사', useTempPassword: 'N', isUsed: 'Y', description: '프론트엔드 개발자', createdBy: 'admin', updatedBy: 'admin', createdAt: '2023-10-27 10:00', updatedAt: '2023-10-27 11:00' },
    { id: 'user002', loginId: 'user002', name: '이순신', system: 'DS MUI NEW', company: '자회사 A', useTempPassword: 'N', isUsed: 'Y', description: '백엔드 개발자', createdBy: 'admin', updatedBy: 'admin', createdAt: '2023-10-26 14:00', updatedAt: '2023-10-26 15:30' },
    { id: 'user003', loginId: 'user003', name: '유관순', system: '레거시 시스템', company: '자회사 B', useTempPassword: 'Y', isUsed: 'N', description: 'UI/UX 디자이너', createdBy: 'admin', updatedBy: 'admin', createdAt: '2023-10-25 09:00', updatedAt: '2023-10-25 09:00' },
    { id: 'user004', loginId: 'user004', name: '세종대왕', system: 'DS MUI NEW', company: '본사', useTempPassword: 'N', isUsed: 'Y', description: '프로젝트 매니저', createdBy: 'admin', updatedBy: 'admin', createdAt: '2023-10-24 11:00', updatedAt: '2023-10-24 18:00' },
];

// 1. 좌측 사용자 그리드 컬럼 정의
const userGridColumns: GridColDef[] = [
    { field: 'loginId', headerName: '로그인ID', width: 120 },
    { field: 'name', headerName: '사용자명', width: 120 },
    { field: 'system', headerName: '시스템', width: 150 },
    { field: 'company', headerName: '회사', width: 150 },
    { field: 'useTempPassword', headerName: '임시비밀번호', width: 100, align: 'center' },
    { field: 'isUsed', headerName: '사용유무', width: 80, align: 'center' },
    { field: 'description', headerName: '설명', flex: 1, minWidth: 150 },
    { field: 'createdBy', headerName: '등록자', width: 100 },
    { field: 'updatedBy', headerName: '수정자', width: 100 },
    { field: 'createdAt', headerName: '등록일시', width: 150 },
    { field: 'updatedAt', headerName: '수정일시', width: 150 },
];

// 2. Select 컴포넌트를 위한 옵션 데이터
// 조회 영역 Select를 위한 옵션 데이터
const systemOptionsForSearch = [
    { value: 'all', label: '전체' },
    { value: 'ds_mui_new', label: 'DS MUI NEW' },
    { value: 'legacy_system', label: '레거시 시스템' },
];

const companyOptionsForSearch = [
    { value: 'all', label: '전체' },
    { value: 'com01', label: '본사' },
    { value: 'com02', label: '자회사 A' },
    { value: 'com03', label: '자회사 B' },
];

// 상세 정보 폼을 위한 추가 옵션 데이터
const systemOptionsForForm = [
    { value: 'ds_mui_new', label: 'DS MUI NEW' },
    { value: 'legacy_system', label: '레거시 시스템' },
];

const companyOptionsForForm = [
    { value: 'com01', label: '본사' },
    { value: 'com02', label: '자회사 A' },
    { value: 'com03', label: '자회사 B' },
];

const departmentOptions = [
    { value: 'dept01', label: '인사팀' },
    { value: 'dept02', label: '개발팀' },
    { value: 'dept03', label: '디자인팀' },
];

// 상세 폼의 '사용여부' Select를 위한 옵션
const usageStatusOptionsForForm = [
    { value: 'Y', label: '사용' },
    { value: 'N', label: '미사용' },
];

export default function UserPage() {
    // ★ 조회 조건 State 수정
    const [searchSystem, setSearchSystem] = useState('all');
    const [searchCompany, setSearchCompany] = useState('all');
    const [loginId, setLoginId] = useState('');
    const [userName, setUserName] = useState('');

    // 오른쪽 상세 정보 폼 State
    const [formState, setFormState] = useState({
        system: 'ds_mui_new',
        loginId: '',
        userName: '',
        password: '',
        company: 'com01',
        department: 'dept02',
        useTempPassword: 'N',
        isUsed: 'Y',
        description: '',
    });

    // ★ handleSearch 수정
    const handleSearch = () => {
        alert(`검색 조건:\n시스템: ${searchSystem}\n회사: ${searchCompany}\n로그인ID: ${loginId}\n사용자명: ${userName}`);
    };

    // ★ handleReset 수정
    const handleReset = () => {
        setSearchSystem('all');
        setSearchCompany('all');
        setLoginId('');
        setUserName('');
    };

    // 상세 폼 입력 변경 핸들러
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    // 상세 폼 Select 변경 핸들러
    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3, boxSizing: 'border-box' }}>
            {/* --- 상단 제목 및 조회 영역 --- */}
            <TitleArea title="사용자 관리">
                <PrintButton onClick={() => alert('인쇄 버튼 클릭')} />
                <ResetButton onClick={handleReset} />
            </TitleArea>

            {/* ★ SearchArea 수정 */}
            <SearchArea>
                <FormField label="시스템" htmlFor="system-search">
                    <Select id="system-search" value={searchSystem} onChange={(e) => setSearchSystem(e.target.value)} sx={{ width: '180px' }}>
                        {systemOptionsForSearch.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormField>
                <FormField label="회사" htmlFor="company-search">
                    <Select id="company-search" value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} sx={{ width: '180px' }}>
                        {companyOptionsForSearch.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormField>
                <FormField label="로그인ID" htmlFor="login-id-search">
                    <TextField id="login-id-search" value={loginId} onChange={(e) => setLoginId(e.target.value)} sx={{ width: '200px' }} />
                </FormField>
                <FormField label="사용자명" htmlFor="user-name-search">
                    <TextField id="user-name-search" value={userName} onChange={(e) => setUserName(e.target.value)} sx={{ width: '200px' }} />
                </FormField>
                <SearchIconButton onClick={handleSearch} />
            </SearchArea>

            {/* --- 하단 7.5:2.5 비율의 메인 콘텐츠 영역 --- */}
            <Box sx={{ display: 'flex', flexGrow: 1, gap: 3, mt: 3, overflow: 'hidden' }}>

                {/* --- 왼쪽 영역 (7.5) - 사용자 그리드 --- */}
                <Box sx={{ flex: 7.5, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <SubTitleArea title="사용자 목록">
                        <AddButton onClick={() => {}} />
                        <DeleteButton onClick={() => {}} />
                        <SaveButton onClick={() => {}} />
                    </SubTitleArea>
                    <DsDataGrid
                        rows={userGridRows}
                        columns={userGridColumns}
                        sx={{ flexGrow: 1 }}
                        showRowNumber
                        checkboxSelection
                        hideFooter
                    />
                </Box>

                {/* --- 오른쪽 영역 (2.5) - 상세 정보 입력 폼 --- */}
                <Box sx={{ flex: 2.5, display: 'flex', flexDirection: 'column' }}>
                    <SubTitleArea title="사용자 상세 정보">
                        <SaveButton onClick={() => {}} />
                    </SubTitleArea>
                    <Box sx={{ border: '1px solid', borderColor: 'divider', flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                        <FormTableRow label="시스템" required>
                            <Select fullWidth name="system" value={formState.system} onChange={handleSelectChange}>
                                {systemOptionsForForm.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormTableRow>
                        <FormTableRow label="로그인ID" required>
                            <TextField fullWidth variant="outlined" name="loginId" value={formState.loginId} onChange={handleFormChange} />
                        </FormTableRow>
                        <FormTableRow label="사용자명" required>
                            <TextField fullWidth variant="outlined" name="userName" value={formState.userName} onChange={handleFormChange} />
                        </FormTableRow>
                        <FormTableRow label="비밀번호">
                            <TextField fullWidth variant="outlined" type="password" name="password" value={formState.password} onChange={handleFormChange} />
                        </FormTableRow>
                        <FormTableRow label="회사" required>
                            <Select fullWidth name="company" value={formState.company} onChange={handleSelectChange}>
                                {companyOptionsForForm.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormTableRow>
                        <FormTableRow label="부서" required>
                            <Select fullWidth name="department" value={formState.department} onChange={handleSelectChange}>
                                {departmentOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormTableRow>
                        <FormTableRow label="임시비밀번호 사용여부">
                            <Select fullWidth name="useTempPassword" value={formState.useTempPassword} onChange={handleSelectChange}>
                                {usageStatusOptionsForForm.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormTableRow>
                        <FormTableRow label="사용여부">
                            <Select fullWidth name="isUsed" value={formState.isUsed} onChange={handleSelectChange}>
                                {usageStatusOptionsForForm.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormTableRow>
                        <FormTableRow label="설명">
                            <TextField fullWidth multiline rows={2} variant="outlined" name="description" value={formState.description} onChange={handleFormChange} />
                        </FormTableRow>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}