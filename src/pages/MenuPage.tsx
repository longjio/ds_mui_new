// D:/ds_mui_new/src/pages/MenuPage.tsx

import React, { useState } from 'react';
import {
    Box,
    Button,
    Paper,
    Typography,
    Avatar,
    IconButton,
    Tooltip,
    ListItemIcon,
    Divider,
} from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

// 컴포넌트와 타입을 각각의 위치에서 가져옵니다.
import DsMenu from '../components/navigation/DsMenu';
// [수정] 'DsMenuItem'을 표준 타입인 'MenuItem'으로 변경합니다.
import { MenuItem } from '../types/menu';

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

    // [수정] 메뉴 아이템 데이터의 타입도 'MenuItem'으로 변경합니다.
    const accountMenuItems: MenuItem[] = [
        { id: 'profile', text: 'Profile', icon: <Avatar sx={{ width: 20, height: 20, mr: 1 }} /> },
        { id: 'my-account', text: 'My account', icon: <Avatar sx={{ width: 20, height: 20, mr: 1 }} /> },
        { id: 'divider-1', text: 'divider', icon: <Divider /> }, // 구분선은 특별한 처리가 필요할 수 있습니다.
        { id: 'add-another', text: 'Add another account', icon: <ListItemIcon><Settings fontSize="small" /></ListItemIcon> },
        { id: 'settings', text: 'Settings', icon: <ListItemIcon><Settings fontSize="small" /></ListItemIcon> },
        { id: 'logout', text: 'Logout', icon: <ListItemIcon><Logout fontSize="small" /></ListItemIcon> },
    ];

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
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
            <DsMenu
                anchorEl={anchorEl}
                isOpen={open}
                onClose={handleClose}
                items={accountMenuItems}
                // ... 기타 props
            />
        </React.Fragment>
    );
};


// --- MenuPage 컴포넌트 ---
export default function MenuPage() {
    return (
        <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>Menu</Typography>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>Account Menu</Typography>
                <AccountMenuExample />
            </Box>
        </Paper>
    );
}