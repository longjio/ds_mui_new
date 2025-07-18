// D:/ds_mui_new/src/layouts/MainLayout.tsx

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
    Box, CircularProgress, useTheme, useMediaQuery, Drawer, AppBar, Toolbar,
    IconButton, Typography, Tabs, Tab, Chip, Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { useAuth } from '../contexts/AuthContext';
import { ThemeModeButtonGroup } from '../components/common/ThemeModeButtonGroup';
import { routableItems, menuStructure } from '../menu-data';
import { MenuItem } from '../types/menu';
import DrawerContent from './DrawerContent';
import NotFoundPage from '../pages/NotFoundPage';

const drawerWidth = 240;

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { user, logout } = useAuth();

    const [openTabs, setOpenTabs] = useState<MenuItem[]>([]);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    // URL이 변경될 때마다 탭 상태를 동기화하는 단일 useEffect
    useEffect(() => {
        const currentItem = routableItems.find(item => item.path === location.pathname);

        if (currentItem) {
            // [수정 1] undefined일 경우 null을 사용하도록 변경
            setActiveTab(currentItem.path ?? null);
            // 현재 아이템이 탭 목록에 없으면 추가
            if (!openTabs.some(tab => tab.id === currentItem.id)) {
                setOpenTabs(prev => [...prev, currentItem]);
            }
        } else {
            // 일치하는 아이템이 없으면 404 상태
            setActiveTab(location.pathname);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]); // URL 변경 시에만 실행

    // 앱 첫 로딩 시 기본 탭 설정
    useEffect(() => {
        const homeItem = routableItems.find(item => item.path === '/app');
        if (homeItem) {
            setOpenTabs([homeItem]);
            // [수정 2] undefined일 경우 null을 사용하도록 변경
            setActiveTab(homeItem.path ?? null);
            // 현재 경로가 기본 경로가 아니라면 해당 경로로 이동
            if (location.pathname !== '/app') {
                navigate(location.pathname, { replace: true });
            } else {
                navigate('/app', { replace: true });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // 최초 1회만 실행

    const handleDrawerToggle = () => setMobileDrawerOpen(!isMobileDrawerOpen);

    const handleMenuClick = useCallback((item: MenuItem) => {
        if (item.path) {
            navigate(item.path);
        }
        if (isMobile) {
            setMobileDrawerOpen(false);
        }
    }, [navigate, isMobile]);

    const handleTabChange = (event: React.SyntheticEvent, newPath: string) => {
        navigate(newPath);
    };

    const handleCloseTab = (e: React.MouseEvent, tabToClose: MenuItem) => {
        e.stopPropagation();
        const tabIndex = openTabs.findIndex(tab => tab.id === tabToClose.id);
        const newTabs = openTabs.filter(tab => tab.id !== tabToClose.id);
        setOpenTabs(newTabs);

        if (activeTab === tabToClose.path) {
            if (newTabs.length > 0) {
                const newActiveTab = newTabs[Math.max(0, tabIndex - 1)];
                navigate(newActiveTab.path!);
            } else {
                navigate('/app');
            }
        }
    };

    const handleTitleClick = useCallback(() => navigate('/app'), [navigate]);
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" onClick={handleTitleClick} sx={{ flexGrow: 1, cursor: 'pointer' }}>
                        SI DESIGN SYSTEM
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        {user && (
                            <>
                                <Chip label={`${user.name}님`} variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
                                <Button color="inherit" onClick={handleLogout}>로그아웃</Button>
                            </>
                        )}
                        <ThemeModeButtonGroup />
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? isMobileDrawerOpen : true}
                onClose={handleDrawerToggle}
                sx={{
                    width: drawerWidth, flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', top: { xs: '56px', sm: '64px' }, height: { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' } },
                }}
            >
                <DrawerContent menuData={menuStructure} onMenuClick={handleMenuClick} />
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, pt: { xs: '56px', sm: '64px' }, width: { sm: `calc(100% - ${drawerWidth}px)` }, height: '100vh', display: 'flex', flexDirection: 'column' }}>
                {!isMobile && openTabs.length > 0 && (
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                        <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                            {openTabs.map((tab) => (
                                <Tab key={tab.id} value={tab.path} label={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {tab.text}
                                        <IconButton size="small" onClick={(e) => handleCloseTab(e, tab)} sx={{ ml: 1.5 }}><CloseIcon fontSize="small" /></IconButton>
                                    </Box>
                                } />
                            ))}
                        </Tabs>
                    </Box>
                )}
                <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
                    <Suspense fallback={<CircularProgress />}>
                        <Routes>
                            {routableItems.map(item => {
                                // [수정 3] component와 path가 모두 있어야만 Route를 생성합니다.
                                if (item.component && item.path) {
                                    const PageComponent = item.component;
                                    const relativePath = item.path.substring('/app'.length);
                                    return <Route key={item.id} path={relativePath} element={<PageComponent />} />;
                                }
                                return null;
                            })}
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Suspense>
                </Box>
            </Box>
        </Box>
    );
}