// D:/ds_mui_new/src/mobile/template/MobileTabSearch.tsx

import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
    Box,
    Stack,
    SelectChangeEvent,
    Tabs,
    Tab,
    // ★ 1. AppBar를 import 목록에서 제거합니다.
} from '@mui/material';

import MobileHeader from '../components/MobileHeader';
import { DsTextField } from '../../components/input/DsTextField';
import { DsSelect, DsSelectItem } from '../../components/input/DsSelect';
import { DsButton } from '../../components/button/DsButton';

// --- 헬퍼 컴포넌트: 탭 패널 ---
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`search-tabpanel-${index}`}
            aria-labelledby={`search-tab-${index}`}
            {...other}
            style={{ height: '100%' }}
        >
            {value === index && (
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

// --- 검색 폼 데이터 ---

// 메뉴 검색용 옵션
const menuSystemOptions: DsSelectItem[] = [
    { value: 'all', label: '전체' },
    { value: 'ds_mui_new', label: 'DS MUI NEW' },
    { value: 'legacy_system', label: '레거시 시스템' },
];
const menuUsageStatusOptions: DsSelectItem[] = [
    { value: 'all', label: '전체' },
    { value: 'true', label: '사용' },
    { value: 'false', label: '미사용' },
];

// 사용자 검색용 옵션 (User.tsx 참고)
const userSystemOptions: DsSelectItem[] = [
    { value: 'all', label: '전체' },
    { value: 'ds_mui_new', label: 'DS MUI NEW' },
    { value: 'legacy_system', label: '레거시 시스템' },
];
const userCompanyOptions: DsSelectItem[] = [
    { value: 'all', label: '전체' },
    { value: 'com01', label: '본사' },
    { value: 'com02', label: '자회사 A' },
    { value: 'com03', label: '자회사 B' },
];


// --- 검색 폼 컴포넌트들 ---

/** 탭 1: 메뉴 검색 폼 */
const MenuSearchForm = () => {
    const navigate = useNavigate();
    const [system, setSystem] = useState('all');
    const [menuId, setMenuId] = useState('');
    const [menuName, setMenuName] = useState('');
    const [isUsed, setIsUsed] = useState('all');

    const handleSearch = () => {
        const queryParams = new URLSearchParams({ system, menuId, menuName, isUsed }).toString();
        navigate(`/m/list?${queryParams}`);
    };

    const handleReset = () => {
        setSystem('all');
        setMenuId('');
        setMenuName('');
        setIsUsed('all');
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4 }}>
                <Stack spacing={3}>
                    <DsSelect label="시스템" value={system} onChange={(e) => setSystem(e.target.value as string)} items={menuSystemOptions} />
                    <DsTextField label="메뉴ID" value={menuId} onChange={(e) => setMenuId(e.target.value)} />
                    <DsTextField label="메뉴명" value={menuName} onChange={(e) => setMenuName(e.target.value)} />
                    <DsSelect label="사용여부" value={isUsed} onChange={(e) => setIsUsed(e.target.value as string)} items={menuUsageStatusOptions} />
                </Stack>
            </Box>
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Stack direction="row" spacing={1}>
                    <DsButton variant="outlined" onClick={handleReset} fullWidth size="xlarge">초기화</DsButton>
                    <DsButton variant="contained" onClick={handleSearch} fullWidth size="xlarge">검색</DsButton>
                </Stack>
            </Box>
        </>
    );
};

/** 탭 2: 사용자 검색 폼 */
const UserSearchForm = () => {
    const navigate = useNavigate();
    const [system, setSystem] = useState('all');
    const [company, setCompany] = useState('all');
    const [loginId, setLoginId] = useState('');
    const [userName, setUserName] = useState('');

    const handleSearch = () => {
        const queryParams = new URLSearchParams({ system, company, loginId, userName }).toString();
        navigate(`/m/user-management?${queryParams}`);
    };

    const handleReset = () => {
        setSystem('all');
        setCompany('all');
        setLoginId('');
        setUserName('');
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4 }}>
                <Stack spacing={3}>
                    <DsSelect label="시스템" value={system} onChange={(e) => setSystem(e.target.value as string)} items={userSystemOptions} />
                    <DsSelect label="회사" value={company} onChange={(e) => setCompany(e.target.value as string)} items={userCompanyOptions} />
                    <DsTextField label="로그인ID" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
                    <DsTextField label="사용자명" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </Stack>
            </Box>
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Stack direction="row" spacing={1}>
                    <DsButton variant="outlined" onClick={handleReset} fullWidth size="xlarge">초기화</DsButton>
                    <DsButton variant="contained" onClick={handleSearch} fullWidth size="xlarge">검색</DsButton>
                </Stack>
            </Box>
        </>
    );
};

/** 탭 3: 권한 그룹 검색 폼 */
const AuthGroupSearchForm = () => {
    const navigate = useNavigate();
    const [groupCode, setGroupCode] = useState('');
    const [groupName, setGroupName] = useState('');

    const handleSearch = () => {
        const queryParams = new URLSearchParams({ groupCode, groupName }).toString();
        // TODO: 권한 그룹 목록 페이지가 만들어지면 아래 경로를 활성화하세요.
        // navigate(`/m/auth-group-list?${queryParams}`);
        alert(`검색 실행: ${queryParams}`);
    };

    const handleReset = () => {
        setGroupCode('');
        setGroupName('');
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4 }}>
                <Stack spacing={3}>
                    <DsTextField label="권한그룹코드" value={groupCode} onChange={(e) => setGroupCode(e.target.value)} />
                    <DsTextField label="권한그룹명" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                </Stack>
            </Box>
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Stack direction="row" spacing={1}>
                    <DsButton variant="outlined" onClick={handleReset} fullWidth size="xlarge">초기화</DsButton>
                    <DsButton variant="contained" onClick={handleSearch} fullWidth size="xlarge">검색</DsButton>
                </Stack>
            </Box>
        </>
    );
};


// --- 메인 페이지 컴포넌트 ---
export default function MobileTabSearchPage() {
    const { handleDrawerToggle } = useOutletContext<{ handleDrawerToggle: () => void }>();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MobileHeader
                title="통합 검색"
                onRightIconClick={handleDrawerToggle}
            />
            {/* ★ 2. AppBar를 Box로 변경하여 불필요한 스타일 상속을 막습니다. */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="search tabs"
                >
                    <Tab label="메뉴 검색" id="search-tab-0" aria-controls="search-tabpanel-0" />
                    <Tab label="사용자 검색" id="search-tab-1" aria-controls="search-tabpanel-1" />
                    <Tab label="권한 검색" id="search-tab-2" aria-controls="search-tabpanel-2" />
                </Tabs>
            </Box>
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <TabPanel value={value} index={0}>
                    <MenuSearchForm />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UserSearchForm />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <AuthGroupSearchForm />
                </TabPanel>
            </Box>
        </Box>
    );
}