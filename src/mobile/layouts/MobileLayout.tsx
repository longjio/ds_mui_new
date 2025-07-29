// D:/ds_mui_new/src/mobile/layouts/MobileLayout.tsx

import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    AppBar, Box, Toolbar, Typography, Drawer, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, IconButton, Divider, Chip,
} from '@mui/material';

// 아이콘 import
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import DataObjectIcon from '@mui/icons-material/DataObject';
import ListAltIcon from '@mui/icons-material/ListAlt';
// ★ 1. LoginIcon은 더 이상 필요 없으므로 제거합니다.
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from '../../contexts/AuthContext';

const drawerRoutes = [
    { path: '/m', label: '모바일 홈', icon: <HomeIcon /> },
    { path: '/m/data', label: '데이터 그리드', icon: <DataObjectIcon /> },
    { path: '/m/menu-config', label: '메뉴 관리', icon: <ListAltIcon /> },
];

export default function MobileLayout() {
    const navigate = useNavigate();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleDrawerToggle = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const handleDrawerMenuClick = (path: string) => {
        navigate(path);
        setDrawerOpen(false);
    };

    const handleLogout = () => {
        logout();
        // ★ 2. 로그아웃 후 공통 로그인 페이지로 이동합니다.
        navigate('/login');
        setDrawerOpen(false);
    };

    const drawerContent = (
        <Box sx={{ width: '100vw' }} role="presentation">
            {/* Drawer 헤더 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={handleDrawerToggle} aria-label="close drawer">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ ml: 1 }}>Menu</Typography>
                </Box>
                {user && <Chip label={`${user.name}님`} variant="outlined" sx={{ mr: 2 }} />}
            </Box>

            {/* Drawer 메뉴 리스트 */}
            <List>
                {drawerRoutes.map((route) => (
                    <ListItem key={route.path} disablePadding>
                        <ListItemButton onClick={() => handleDrawerMenuClick(route.path)}>
                            <ListItemIcon>{route.icon}</ListItemIcon>
                            <ListItemText primary={route.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider />

            {/* ★ 3. 로그인 상태일 때만 로그아웃 버튼을 보여줍니다. (로그인 버튼 제거) */}
            <List>
                {user && (
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText primary="로그아웃" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* 상단 헤더 */}
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>모바일 페이지</Typography>
                </Toolbar>
            </AppBar>

            {/* 왼쪽 Drawer */}
            <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle} PaperProps={{ sx: { width: '100%', bgcolor: 'background.default' } }}>
                {drawerContent}
            </Drawer>

            {/* 메인 컨텐츠 영역 */}
            <Box component="main" sx={{ flexGrow: 1, pt: '56px', overflowY: 'auto' }}>
                <Outlet />
            </Box>
        </Box>
    );
}