// D:/ds_mui_new/src/mobile/layouts/MobileLayout.tsx

import React, { useState, useCallback } from 'react';
import { Outlet, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import {
    AppBar, Box, Toolbar, Typography, Drawer, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, IconButton,
    Divider, Chip, Card, CardContent, Grid as MuiGrid, Paper, Collapse,
    Link as MuiLink,
} from '@mui/material';

// 아이콘 import (기존과 동일)
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ArticleIcon from '@mui/icons-material/Article';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { useAuth } from '../../contexts/AuthContext';
import { DsButton } from '../../components/button/DsButton';
import { TitleS } from '../../components/typography';

// 타입 및 데이터 정의 (기존과 동일)
const Grid: any = MuiGrid;
interface MenuItemData { path: string; label: string; icon?: React.ElementType; }
const mainMenuItems: MenuItemData[] = [
    { path: '/m', label: '대시보드', icon: DashboardIcon },
    { path: '/m/menu-config', label: '메뉴 관리', icon: ListAltIcon },
    { path: '/m/user-management', label: '사용자 관리', icon: ManageAccountsIcon },
    { path: '/m/board', label: '게시판', icon: ArticleIcon },
];
const quickAccessItems: MenuItemData[] = [
    { path: '/m/menu-config', label: 'Search' },
    { path: '/m/video-list', label: 'Video' },
];
const menuSettingsItems: MenuItemData[] = [
    { path: '/m/menu-config', label: 'Search' },
    { path: '/m/menu-obj-config', label: 'Search + Grid' },
    { path: '/m/search', label: 'Search -> List -> Detail' },
];
const templateItems: MenuItemData[] = [
    { path: '/m/user-management', label: 'List Group + Detail' },
    { path: '/m/store-list', label: 'List Group = Image+TextInfo' },
    { path: '/m/tab-search', label: 'Tab = Tab+Search' },
    { path: '/m/board', label: 'Board = List+Detail+Write+FileUpload' },
    { path: '/m/report', label: 'Report = Tab(lev1)+Tab(lev2)+List+Chart' },
    { path: '/m/video-list', label: 'Video = List + play', icon: OndemandVideoIcon },
];
interface ExpandedSectionsState { menuSettings: boolean; userAuth: boolean; template: boolean; }
interface MenuSectionProps {
    title: string;
    items: MenuItemData[];
    isGrid?: boolean;
    sectionKey?: keyof ExpandedSectionsState;
    collapsible?: boolean;
    isExpanded: boolean;
    onSectionToggle: (section: keyof ExpandedSectionsState) => void;
    onMenuClick: (path: string) => void;
    currentPath: string;
}

const MenuSection = ({
                         title,
                         items,
                         isGrid = false,
                         sectionKey,
                         collapsible = false,
                         isExpanded,
                         onSectionToggle,
                         onMenuClick,
                         currentPath,
                     }: MenuSectionProps) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Box
                onClick={() => collapsible && sectionKey && onSectionToggle(sectionKey)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                    cursor: collapsible ? 'pointer' : 'default',
                    //touchAction: 'manipulation',
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
                                            '&:hover': { bgcolor: 'action.hover' },
                                            borderRadius: 2,
                                            // ★ 탭 딜레이 제거 (2/4)
                                            touchAction: 'manipulation',
                                        }}
                                        onClick={() => onMenuClick(item.path)}
                                    >
                                        <CardContent sx={{ textAlign: 'center', p: 1, '&:last-child': { pb: 1 } }}>
                                            <Box sx={{
                                                width: 40, height: 40, mx: 'auto', mb: 1,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                {IconComponent && <IconComponent sx={{ fontSize: 36, color: 'primary.main' }} />}
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
                    <List disablePadding>
                        {items.map((item) => {
                            const isSelected = currentPath === item.path;
                            return (
                                <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                                    <ListItemButton
                                        selected={isSelected}
                                        onClick={() => onMenuClick(item.path)}
                                        sx={{
                                            borderRadius: 2,
                                            py: 1.5,
                                            '&.Mui-selected': { bgcolor: 'primary.50', '&:hover': { bgcolor: 'primary.100' } },
                                            // ★ 탭 딜레이 제거 (3/4)
                                            touchAction: 'manipulation',
                                        }}
                                    >
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


export default function MobileLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { user, logout } = useAuth();

    const isHomePage = location.pathname === '/m' || location.pathname === '/m/';

    const [expandedSections, setExpandedSections] = useState<ExpandedSectionsState>({
        menuSettings: true,
        userAuth: true,
        template: true,
    });

    const [favorites, setFavorites] = useState<Set<string>>(new Set(['/m/menu-config']));

    const handleDrawerToggle = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const handleMenuClick = useCallback((path: string) => {
        navigate(path);
        setDrawerOpen(false);
    }, [navigate]);

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

    const drawerContent = (
        <Box sx={{ width: '100vw', bgcolor: 'background.default', height: '100%' }}>
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: 'background.paper',
                    px: '20px',
                    py: 1,
                    border: 0,
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>메뉴</Typography>
                    {user && (<Chip label={`${user.name}님`} variant="outlined" size="small" sx={{ ml: 2, bgcolor: 'primary.50', borderColor: 'primary.200' }} />)}
                </Box>
                <IconButton onClick={handleDrawerToggle} aria-label="close drawer"><CloseIcon /></IconButton>
            </Paper>

            <Box sx={{
                overflowY: 'auto',
                height: 'calc(100vh - 72px)',
                px: '20px',
                py: 2
            }}>
                <MenuSection
                    title=""
                    items={mainMenuItems}
                    isGrid={true}
                    isExpanded={true}
                    onSectionToggle={handleSectionToggle}
                    onMenuClick={handleMenuClick}
                    currentPath={location.pathname}
                />
                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '16px', mb: 1 }}>
                        자주 찾는 메뉴
                    </Typography>
                    <Box sx={{ overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
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
                                            flexShrink: 0, borderRadius: '50px', borderColor: 'divider',
                                            p: 0, '&:hover': { bgcolor: 'action.hover' },
                                            // ★ 탭 딜레이 제거 (4/4) - 버튼에도 적용
                                            touchAction: 'manipulation',
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
                    title="Basic Form"
                    items={menuSettingsItems}
                    sectionKey="menuSettings"
                    collapsible={true}
                    isExpanded={expandedSections.menuSettings}
                    onSectionToggle={handleSectionToggle}
                    onMenuClick={handleMenuClick}
                    currentPath={location.pathname}
                />
                {/*<MenuSection*/}
                {/*    title="사용자 및 권한"*/}
                {/*    items={userAuthItems}*/}
                {/*    sectionKey="userAuth"*/}
                {/*    collapsible={true}*/}
                {/*    isExpanded={expandedSections.userAuth}*/}
                {/*    onSectionToggle={handleSectionToggle}*/}
                {/*    onMenuClick={handleMenuClick}*/}
                {/*    currentPath={location.pathname}*/}
                {/*/>*/}

                <MenuSection
                    title="Template"
                    items={templateItems}
                    sectionKey="template"
                    collapsible={true}
                    isExpanded={expandedSections.template}
                    onSectionToggle={handleSectionToggle}
                    onMenuClick={handleMenuClick}
                    currentPath={location.pathname}
                />

                <Divider sx={{ my: 3 }} />

                {user && (
                    <Box>
                        <ListItemButton
                            onClick={handleLogout}
                            sx={{
                                borderRadius: 2,
                                py: 1.5,
                                bgcolor: 'error.50',
                                '&:hover': { bgcolor: 'error.100' },
                                touchAction: 'manipulation',
                            }}
                        >
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
            {isHomePage && (
                <AppBar position="fixed" elevation={2}>
                    <Toolbar>
                        <MuiLink
                            component={RouterLink}
                            to="/m"
                            sx={{
                                flexGrow: 1,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <TitleS component="h1">
                                SI DESIGN SYSTEM
                            </TitleS>
                        </MuiLink>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            )}

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                    sx: { width: '100%', bgcolor: 'background.default' },
                    'aria-label': '메인 네비게이션 메뉴'
                }}
            >
                {drawerContent}
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, pt: isHomePage ? '56px' : 0, overflowY: 'auto' }}>
                <Outlet context={{ handleDrawerToggle }} />
            </Box>
        </Box>
    );
}