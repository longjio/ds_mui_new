// D:/ds_mui_new/src/mobile/layouts/MobileLayout.tsx

import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar, Box, Toolbar, Typography, Drawer, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, IconButton,
    Divider, Chip, Card, CardContent, Grid as MuiGrid, Avatar, Paper, Collapse
} from '@mui/material';

// 아이콘 import
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import BookmarkIcon from '@mui/icons-material/Bookmark';
// ★★★ 수정 1: 칩 디자인에 필요한 아이콘을 다시 import 합니다.
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// 새로운 메뉴에 맞는 아이콘들을 import 합니다.
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SecurityIcon from '@mui/icons-material/Security';


import { useAuth } from '../../contexts/AuthContext';
import { DsButton } from '../../components/button/DsButton';

// Grid 타입 오류를 해결하기 위해 타입 검사를 비활성화합니다.
const Grid: any = MuiGrid;

// 프로젝트의 template 페이지들을 기반으로 모바일 메뉴를 재구성합니다.

// 1. 메인 메뉴 그리드 (4개씩 한 줄)
const mainMenuItems = [
    { path: '/m/dashboard', label: '대시보드', icon: DashboardIcon },
    { path: '/m/menu-config', label: '메뉴 관리', icon: ListAltIcon },
    { path: '/m/user-management', label: '사용자 관리', icon: ManageAccountsIcon },
    { path: '/m/auth-group', label: '권한 그룹', icon: SecurityIcon }
];

// ★★★ 수정 2: 칩(Chip) 디자인으로 표시될 퀵 액세스 메뉴 데이터를 추가합니다.
const quickAccessItems = [
    { path: '/m/menu-config', label: '메뉴 관리' },
    { path: '/m/user-management', label: '사용자 관리' },
    { path: '/m/auth-group', label: '권한 그룹' },
];

// 2. 메뉴 관리 섹션
const menuSettingsItems = [
    { path: '/m/menu-config', label: '메뉴 관리' },
    { path: '/m/menu-obj-config', label: '메뉴-객체 연결' },
];

// 3. 사용자 및 권한 관리 섹션
const userAuthItems = [
    { path: '/m/user-management', label: '사용자 관리' },
    { path: '/m/user-menu-auth', label: '사용자별 메뉴 권한' },
    { path: '/m/auth-group', label: '권한 그룹 관리' },
    { path: '/m/auth-group-user', label: '그룹별 사용자 설정' },
];


export default function MobileLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { user, logout } = useAuth();

    const [expandedSections, setExpandedSections] = useState({
        menuSettings: true,
        userAuth: true,
    });

    // ★★★ 수정 3: 즐겨찾기 기본값을 현재 프로젝트에 맞게 수정합니다.
    const [favorites, setFavorites] = useState<Set<string>>(new Set(['/m/menu-config']));

    const handleDrawerToggle = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const handleMenuClick = (path: string) => {
        navigate(path);
        setDrawerOpen(false);
    };

    const handleSectionToggle = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleToggleFavorite = (e: React.MouseEvent, path: string) => {
        e.stopPropagation();
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(path)) {
                newFavorites.delete(path);
            } else {
                newFavorites.add(path);
            }
            return newFavorites;
        });
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            setDrawerOpen(false);
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    const MenuSection = ({
                             title,
                             items,
                             isGrid = false,
                             sectionKey,
                             collapsible = false
                         }: {
        title: string;
        items: any[];
        isGrid?: boolean;
        sectionKey?: keyof typeof expandedSections;
        collapsible?: boolean;
    }) => {
        const isExpanded = sectionKey ? expandedSections[sectionKey] : true;

        return (
            <Box sx={{ mb: 3 }}>
                <Box
                    onClick={() => collapsible && sectionKey && handleSectionToggle(sectionKey)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                        px: 2,
                        cursor: collapsible ? 'pointer' : 'default'
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '16px' }}>
                        {title}
                    </Typography>
                    {collapsible && (
                        <IconButton size="small" sx={{ color: 'text.secondary' }}>
                            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    )}
                </Box>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    {isGrid ? (
                        <Grid container>
                            {items.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <Grid item xs={3} key={item.path} sx={{ p: 1, flex: 1 }}>
                                        <Card
                                            elevation={0}
                                            sx={{
                                                bgcolor: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    bgcolor: 'action.hover',
                                                },
                                                borderRadius: 2,
                                            }}
                                            onClick={() => handleMenuClick(item.path)}
                                        >
                                            <CardContent sx={{ textAlign: 'center', p: 1, '&:last-child': { pb: 1 } }}>
                                                <Box sx={{
                                                    width: 40,
                                                    height: 40,
                                                    mx: 'auto',
                                                    mb: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <IconComponent sx={{ fontSize: 36, color: 'primary.main' }} />
                                                </Box>
                                                <Typography variant="caption" sx={{ fontSize: '12px', lineHeight: 1.2, display: 'block' }}>
                                                    {item.label}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ) : (
                        <List sx={{ px: 1 }}>
                            {items.map((item) => {
                                const isSelected = location.pathname === item.path;
                                return (
                                    <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                                        <ListItemButton selected={isSelected} onClick={() => handleMenuClick(item.path)} sx={{ borderRadius: 2, py: 1.5, '&.Mui-selected': { bgcolor: 'primary.50', '&:hover': { bgcolor: 'primary.100' } } }}>
                                            {/* ★★★ 수정 4: 역할 중복을 피하기 위해 세로 목록에서는 즐겨찾기 아이콘을 제거합니다. */}
                                            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '15px', fontWeight: isSelected ? 600 : 400 }} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                </Collapse>
            </Box>
        );
    };

    const drawerContent = (
        <Box sx={{ width: '100vw', bgcolor: 'background.default', height: '100%' }}>
            <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>메뉴</Typography>
                    {user && (<Chip label={`${user.name}님`} variant="outlined" size="small" sx={{ ml: 2, bgcolor: 'primary.50', borderColor: 'primary.200' }} />)}
                </Box>
                <IconButton onClick={handleDrawerToggle} aria-label="close drawer"><CloseIcon /></IconButton>
            </Paper>

            <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 80px)', py: 2 }}>
                <MenuSection title="" items={mainMenuItems} isGrid={true} />
                <Divider sx={{ mx: 2, my: 2 }} />

                {/* ★★★ 수정 5: 퀵 액세스 칩 메뉴를 다시 추가합니다. ★★★ */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '16px', px: 2, mb: 1 }}>
                        퀵 액세스
                    </Typography>
                    <Box sx={{ overflowX: 'auto', p: '0 16px', '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
                        <Box sx={{ display: 'flex', gap: 1, py: 1 }}>
                            {quickAccessItems.map((item) => {
                                const isFavorite = favorites.has(item.path);
                                return (
                                    <DsButton
                                        key={item.path}
                                        variant="outlined"
                                        color="inherit"
                                        onClick={() => handleMenuClick(item.path)}
                                        sx={{
                                            flexShrink: 0,
                                            borderRadius: '50px',
                                            borderColor: 'divider',
                                            p: 0,
                                            '&:hover': { bgcolor: 'action.hover' }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: '6px' }}>
                                            <Typography variant="body2" sx={{ mr: 1, color: 'text.primary' }}>{item.label}</Typography>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleToggleFavorite(e, item.path)}
                                                sx={{ p: '2px', color: isFavorite ? 'primary.main' : 'text.secondary' }}
                                            >
                                                {isFavorite ? <BookmarkIcon sx={{ fontSize: 18 }} /> : <BookmarkBorderIcon sx={{ fontSize: 18 }} />}
                                            </IconButton>
                                        </Box>
                                    </DsButton>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>

                <MenuSection
                    title="메뉴 설정"
                    items={menuSettingsItems}
                    sectionKey="menuSettings"
                    collapsible={true}
                />
                <MenuSection
                    title="사용자 및 권한"
                    items={userAuthItems}
                    sectionKey="userAuth"
                    collapsible={true}
                />

                <Divider sx={{ mx: 2, my: 3 }} />

                {user && (
                    <Box sx={{ px: 2 }}>
                        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, py: 1.5, bgcolor: 'error.50', '&:hover': { bgcolor: 'error.100' } }}>
                            <ListItemIcon><LogoutIcon sx={{ color: 'error.main' }} /></ListItemIcon>
                            <ListItemText primary="로그아웃" primaryTypographyProps={{ color: 'error.main', fontWeight: 500 }} />
                        </ListItemButton>
                    </Box>
                )}
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <AppBar position="fixed" elevation={2}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>SI DESIGN SYSTEM</Typography>
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}><MenuIcon /></IconButton>
                </Toolbar>
            </AppBar>

            <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerToggle} PaperProps={{ sx: { width: '100%', bgcolor: 'background.default' }, 'aria-label': '메인 네비게이션 메뉴' }}>
                {drawerContent}
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, pt: '56px', overflowY: 'auto' }}>
                <Outlet />
            </Box>
        </Box>
    );
}