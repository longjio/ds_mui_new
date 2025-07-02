import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    IconButton,
    Tooltip,
} from '@mui/material';

// 아이콘 import
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

// 컴포넌트와 타입을 각각의 위치에서 가져옵니다.
import DsMenu from '../components/navigation/DsMenu';
import { DsMenuItem } from '../types/menu';

// --- AccountMenuExample 컴포넌트 ---
const AccountMenuExample = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {/* --- 바로 이 부분에 두 개의 텍스트 메뉴를 추가했습니다 --- */}
                <Typography sx={{ minWidth: 100 }}>Profile</Typography>
                <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    Dashboard
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    Analytics
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};


// --- MenuPage 컴포넌트 (이전과 거의 동일) ---
const MenuPage = () => {
    const [basicMenuAnchor, setBasicMenuAnchor] = useState<null | HTMLElement>(null);
    const [iconMenuAnchor, setIconMenuAnchor] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => {
        setAnchor(event.currentTarget);
    };

    const handleCloseMenu = (setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => {
        setAnchor(null);
    };

    const basicMenuItems: DsMenuItem[] = [
        { id: 'profile', label: 'Profile', onClick: () => console.log('Profile clicked') },
        { id: 'my-account', label: 'My account', onClick: () => console.log('My account clicked') },
        { id: 'logout', label: 'Logout', onClick: () => console.log('Logout clicked') },
    ];

    const iconMenuItems: DsMenuItem[] = [
        { id: 'profile-icon', label: 'Profile', icon: <AccountCircleIcon fontSize="small" /> },
        { id: 'settings-icon', label: 'Settings', icon: <Settings fontSize="small" /> },
        { id: 'divider-1', label: '', divider: true },
        { id: 'print-icon', label: 'Print', icon: <PrintIcon fontSize="small" />, disabled: true },
        { id: 'share-icon', label: 'Share', icon: <ShareIcon fontSize="small" /> },
        { id: 'divider-2', label: '', divider: true },
        { id: 'logout-icon', label: 'Logout', icon: <Logout fontSize="small" /> },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h1" gutterBottom>
                Menu
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Menu는 버튼과 같은 요소와의 상호작용을 통해 임시적인 옵션 목록을 표시합니다.
            </Typography>

            {/* --- 예제 1: 기본 메뉴 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Basic Menu
            </Typography>
            <Button
                variant="contained"
                onClick={(e) => handleOpenMenu(e, setBasicMenuAnchor)}
            >
                Open Basic Menu
            </Button>
            <DsMenu
                items={basicMenuItems}
                anchorEl={basicMenuAnchor}
                open={Boolean(basicMenuAnchor)}
                onClose={() => handleCloseMenu(setBasicMenuAnchor)}
            />

            {/* --- 예제 2: 아이콘, 구분선, 비활성화 포함 메뉴 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Menu with Icons & Dividers
            </Typography>
            <Button
                variant="contained"
                onClick={(e) => handleOpenMenu(e, setIconMenuAnchor)}
            >
                Open Icon Menu
            </Button>
            <DsMenu
                items={iconMenuItems}
                anchorEl={iconMenuAnchor}
                open={Boolean(iconMenuAnchor)}
                onClose={() => handleCloseMenu(setIconMenuAnchor)}
            />

            {/* --- 예제 3: 계정 메뉴 (새로 추가) --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Account Menu
            </Typography>
            <AccountMenuExample />
        </Box>
    );
};

export default MenuPage;