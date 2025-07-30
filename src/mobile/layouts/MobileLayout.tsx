// D:/ds_mui_new/src/mobile/layouts/MobileLayout.tsx

import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar, Box, Toolbar, Typography, Drawer, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, IconButton,
    Divider, Chip, Card, CardContent, Grid, Avatar, Paper
} from '@mui/material';

// 아이콘 import
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import DataObjectIcon from '@mui/icons-material/DataObject';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import FiberNewIcon from '@mui/icons-material/FiberNew';

import { useAuth } from '../../contexts/AuthContext';

// 메인 메뉴 그리드 (4개씩 한 줄)
const mainMenuItems = [
    { path: '/m', label: '내 정보', icon: PersonIcon, color: '#4CAF50' },
    { path: '/m/data', label: '고객센터', icon: DataObjectIcon, color: '#2196F3' },
    { path: '/m/search', label: '이벤트', icon: SearchIcon, color: '#FF9800' },
    { path: '/m/form', label: '설정', icon: SettingsIcon, color: '#9C27B0' }
];

// 자주 찾는 메뉴
const frequentMenuItems = [
    { path: '/m/card', label: '카드이용내역', icon: BookmarkIcon },
    { path: '/m/mycard', label: '내카드 실적·혜택', icon: EditNoteIcon },
    { path: '/m/economy', label: '다금경제내역', icon: DataObjectIcon }
];

// HOT & NEW 메뉴
const hotNewItems = [
    { path: '/m/policy', label: '정부정책지원사업', icon: WhatshotIcon },
    { path: '/m/welfare', label: '1차 민생회복 소비쿠폰 신청하기', icon: FiberNewIcon }
];

// 내역·한도 메뉴
const historyItems = [
    { path: '/m/card-history', label: '카드이용내역', icon: BookmarkIcon },
    { path: '/m/kb-pay', label: 'KB Pay 통합이용내역', icon: DataObjectIcon },
    { path: '/m/my-card-benefit', label: '내카드 실적·혜택', icon: EditNoteIcon },
    { path: '/m/installment', label: '적립·할인내역', icon: NotificationsIcon },
    { path: '/m/usage-limit', label: '이용한도', icon: SettingsIcon }
];

export default function MobileLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleDrawerToggle = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const handleMenuClick = (path: string) => {
        navigate(path);
        setDrawerOpen(false);
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

    const MenuSection = ({ title, items, isGrid = false }: {
        title: string;
        items: any[];
        isGrid?: boolean;
    }) => (
        <Box sx={{ mb: 3 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
                px: 2
            }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: '16px'
                    }}
                >
                    {title}
                </Typography>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <CloseIcon sx={{ fontSize: 16, transform: 'rotate(180deg)' }} />
                </IconButton>
            </Box>

            {isGrid ? (
                <Grid container spacing={2} sx={{ px: 2 }}>
                    {items.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <Grid item xs={3} key={item.path}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        bgcolor: 'grey.50',
                                        cursor: 'pointer',
                                        '&:hover': { bgcolor: 'grey.100' },
                                        borderRadius: 2
                                    }}
                                    onClick={() => handleMenuClick(item.path)}
                                >
                                    <CardContent sx={{
                                        textAlign: 'center',
                                        py: 2,
                                        px: 1,
                                        '&:last-child': { pb: 2 }
                                    }}>
                                        <Avatar sx={{
                                            bgcolor: item.color || 'primary.main',
                                            width: 40,
                                            height: 40,
                                            mx: 'auto',
                                            mb: 1
                                        }}>
                                            <IconComponent sx={{ fontSize: 20 }} />
                                        </Avatar>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '12px',
                                                lineHeight: 1.2,
                                                display: 'block'
                                            }}
                                        >
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
                        const IconComponent = item.icon;
                        const isSelected = location.pathname === item.path;
                        return (
                            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                                <ListItemButton
                                    selected={isSelected}
                                    onClick={() => handleMenuClick(item.path)}
                                    sx={{
                                        borderRadius: 2,
                                        py: 1.5,
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.50',
                                            '&:hover': { bgcolor: 'primary.100' }
                                        }
                                    }}
                                >
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{
                                            fontSize: '15px',
                                            fontWeight: isSelected ? 600 : 400
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        sx={{
                                            color: 'text.secondary',
                                            ml: 1
                                        }}
                                    >
                                        <BookmarkIcon sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </Box>
    );

    const drawerContent = (
        <Box sx={{ width: '100vw', bgcolor: 'background.default', height: '100%' }}>
            {/* 헤더 영역 */}
            <Paper
                elevation={1}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    bgcolor: 'background.paper'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                        메뉴
                    </Typography>
                    {user && (
                        <Chip
                            label={`${user.name}님`}
                            variant="outlined"
                            size="small"
                            sx={{
                                ml: 2,
                                bgcolor: 'primary.50',
                                borderColor: 'primary.200'
                            }}
                        />
                    )}
                </Box>
                <IconButton onClick={handleDrawerToggle} aria-label="close drawer">
                    <CloseIcon />
                </IconButton>
            </Paper>

            {/* 스크롤 가능한 메뉴 영역 */}
            <Box sx={{
                overflowY: 'auto',
                height: 'calc(100vh - 80px)',
                py: 2
            }}>
                {/* 메인 메뉴 그리드 */}
                <MenuSection title="" items={mainMenuItems} isGrid={true} />

                <Divider sx={{ mx: 2, my: 2 }} />

                {/* 자주 찾는 메뉴 */}
                <MenuSection title="자주 찾는" items={frequentMenuItems} />

                {/* HOT & NEW */}
                <MenuSection title="HOT & NEW" items={hotNewItems} />

                {/* 내역·한도 */}
                <MenuSection title="내역·한도" items={historyItems} />

                <Divider sx={{ mx: 2, my: 3 }} />

                {/* 로그아웃 */}
                {user && (
                    <Box sx={{ px: 2 }}>
                        <ListItemButton
                            onClick={handleLogout}
                            sx={{
                                borderRadius: 2,
                                py: 1.5,
                                bgcolor: 'error.50',
                                '&:hover': { bgcolor: 'error.100' }
                            }}
                        >
                            <ListItemIcon>
                                <LogoutIcon sx={{ color: 'error.main' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="로그아웃"
                                primaryTypographyProps={{
                                    color: 'error.main',
                                    fontWeight: 500
                                }}
                            />
                        </ListItemButton>
                    </Box>
                )}
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* 상단 헤더 */}
            <AppBar position="fixed" elevation={2}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        모바일 앱
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                    sx: {
                        width: '100%',
                        bgcolor: 'background.default'
                    },
                    'aria-label': '메인 네비게이션 메뉴'
                }}
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