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
import SearchIcon from '@mui/icons-material/Search'; // ListAltIcon 대신 SearchIcon 사용
import LogoutIcon from '@mui/icons-material/Logout';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { useAuth } from '../../contexts/AuthContext';

// Drawer 메뉴의 경로와 이름을 수정합니다.
const drawerRoutes = [
    { path: '/m', label: '모바일 홈', icon: <HomeIcon /> },
    { path: '/m/data', label: '데이터 그리드', icon: <DataObjectIcon /> },
    { path: '/m/search', label: '메뉴 검색', icon: <SearchIcon /> },
    { path: '/m/form', label: '상세 폼', icon: <EditNoteIcon /> },
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
        navigate('/login');
        setDrawerOpen(false);
    };

    const drawerContent = (
        <Box sx={{ width: '100vw' }} role="presentation">
            {/* Drawer 헤더: Close 버튼을 오른쪽으로 이동 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ ml: 2 }}>Menu</Typography>
                    {user && <Chip label={`${user.name}님`} variant="outlined" sx={{ ml: 2 }} />}
                </Box>
                <IconButton onClick={handleDrawerToggle} aria-label="close drawer">
                    <CloseIcon />
                </IconButton>
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

            {/* 로그아웃 버튼 */}
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
                    {/* 1. Typography를 먼저 배치하여 왼쪽으로 정렬합니다. */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>모바일 페이지</Typography>

                    {/* 2. IconButton에서 edge="end" prop을 제거하여 기본 여백을 적용합니다. */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* 3. Drawer가 오른쪽에서 나오도록 anchor를 'right'로 변경합니다. */}
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleDrawerToggle}
                PaperProps={{ sx: { width: '100%', bgcolor: 'background.default' } }}
            >
                {drawerContent}
            </Drawer>

            {/* 메인 컨텐츠 영역 */}
            <Box component="main" sx={{ flexGrow: 1, pt: '56px', overflowY: 'auto' }}>
                <Outlet />
            </Box>
        </Box>
    );
}