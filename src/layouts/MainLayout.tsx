// D:/ds_mui/src/layouts/MainLayout.tsx

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    useTheme,
    useMediaQuery,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tabs,
    Tab,
    Menu,
    MenuItem as MuiMenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { menuGroups, MenuItem } from '../app-routes';
import { ThemeModeButtonGroup } from '../components/common/ThemeModeButtonGroup';
import Dashboard from '../pages/Dashboard';

const drawerWidth = 240;

type OpenTabInfo = Omit<MenuItem, 'children'>;

const MainLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [openTabs, setOpenTabs] = useState<OpenTabInfo[]>([]);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);

    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    useEffect(() => {
        const currentPath = location.pathname;
        if (openTabs.some(tab => tab.path === currentPath)) {
            setActiveTabId(currentPath);
        } else if (currentPath === '/') {
            setActiveTabId(null);
        }
    }, [location.pathname, openTabs]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (menuItem: MenuItem) => {
        if (!menuItem.path) return;

        if (!isMobile && !openTabs.some((tab: OpenTabInfo) => tab.id === menuItem.id)) {
            const newTab: OpenTabInfo = {
                id: menuItem.id,
                text: menuItem.text,
                path: menuItem.path,
            };
            setOpenTabs(prevTabs => [...prevTabs, newTab]);
        }

        navigate(menuItem.path);
        setActiveTabId(menuItem.path);

        if (isMobile) {
            handleDrawerToggle();
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newTabId: string) => {
        setActiveTabId(newTabId);
        navigate(newTabId);
    };

    const handleCloseTab = (e: React.MouseEvent, tabIdToClose: string) => {
        e.stopPropagation();

        const newTabs = openTabs.filter(tab => tab.path !== tabIdToClose);
        setOpenTabs(newTabs);

        if (activeTabId === tabIdToClose) {
            if (newTabs.length > 0) {
                const newActiveTab = newTabs[newTabs.length - 1];
                setActiveTabId(newActiveTab.path!);
                navigate(newActiveTab.path!);
            } else {
                setActiveTabId(null);
                navigate('/');
            }
        }
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY + 14,
                }
                : null,
        );
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    const handleCloseAllTabs = () => {
        setOpenTabs([]);
        setActiveTabId(null);
        navigate('/');
        handleCloseContextMenu();
    };

    const drawerContent = (
        <Box sx={{ overflow: 'auto', height: '100%' }}>
            {menuGroups.map((group) => (
                <Accordion key={group.id} disableGutters elevation={0} defaultExpanded sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.12)', '&:before': { display: 'none' }, '&:last-child': { borderBottom: '1px solid rgba(0, 0, 0, 0.12)' } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${group.id}-content`} id={`${group.id}-header`}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{group.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List disablePadding>
                            {group.items.map((item) => (
                                <React.Fragment key={item.id}>
                                    <ListItemButton onClick={() => handleMenuClick(item)} sx={{ pl: item.children ? 3 : 4 }}>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                    {item.children?.map((subItem) => (
                                        <ListItemButton key={subItem.id} onClick={() => handleMenuClick(subItem)} sx={{ pl: 6 }}>
                                            <ListItemText primary={subItem.text} />
                                        </ListItemButton>
                                    ))}
                                </React.Fragment>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                }}
            >
                {/* ✅ [수정] Toolbar의 고정 패딩을 제거하여 반응형으로 개선하고, 내부에 IconButton을 추가합니다. */}
                <Toolbar>
                    {/* ✅ [추가] 모바일 뷰에서만 보이는 메뉴 버튼 */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { md: 'none' }, // 'md'보다 작은 화면에서만 보이도록 설정
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => { setOpenTabs([]); setActiveTabId(null); navigate('/'); }}
                        sx={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer', flexGrow: 1 }}
                    >
                        SI Design System
                    </Typography>
                    <ThemeModeButtonGroup />
                </Toolbar>
            </AppBar>

            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={isMobile ? handleDrawerToggle : undefined}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        top: { xs: '56px', sm: '64px' },
                        height: { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' },
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: { xs: '56px', sm: '64px' },
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {!isMobile && location.pathname !== '/' && (
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                        <Tabs
                            value={activeTabId || false}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                        >
                            {openTabs.map((tab) => (
                                <Tab
                                    key={tab.id}
                                    value={tab.path}
                                    onContextMenu={handleContextMenu}
                                    label={
                                        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                            {tab.text}
                                            <IconButton size="small" component="span" onClick={(e) => handleCloseTab(e, tab.path!)} sx={{ ml: 1.5 }}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    }
                                />
                            ))}
                        </Tabs>
                    </Box>
                )}

                <Box sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    p: location.pathname === '/' ? 0 : 3,
                    bgcolor: location.pathname === '/' ? 'transparent' : 'background.paper',
                }}>
                    {location.pathname !== '/' ? (
                        <Outlet />
                    ) : (
                        <Dashboard />
                    )}
                </Box>
            </Box>

            <Menu
                open={contextMenu !== null}
                onClose={handleCloseContextMenu}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MuiMenuItem onClick={handleCloseAllTabs}>전체 탭 닫기</MuiMenuItem>
            </Menu>
        </Box>
    );
};

export default MainLayout;