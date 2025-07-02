import React from 'react';
import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    MenuProps as MuiMenuProps,
} from '@mui/material';
// 새로 만든 타입 파일을 import 합니다.
import { DsMenuItem } from '../../types/menu';

// DsMenu 컴포넌트가 받을 props 타입을 정의합니다.
interface DsMenuProps extends Omit<MuiMenuProps, 'open' | 'onClose' | 'anchorEl'> {
    items: DsMenuItem[];
    open: boolean;
    anchorEl: MuiMenuProps['anchorEl'];
    onClose: () => void;
}

const DsMenu: React.FC<DsMenuProps> = ({ items, open, anchorEl, onClose, ...otherProps }) => {
    const handleItemClick = (itemOnClick?: () => void) => {
        if (itemOnClick) {
            itemOnClick();
        }
        onClose(); // 메뉴 아이템 클릭 시 항상 메뉴를 닫습니다.
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...otherProps}
        >
            {items.map((item) => (
                <React.Fragment key={item.id}>
                    <MenuItem onClick={() => handleItemClick(item.onClick)} disabled={item.disabled}>
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        <ListItemText>{item.label}</ListItemText>
                    </MenuItem>
                    {item.divider && <Divider />}
                </React.Fragment>
            ))}
        </Menu>
    );
};

export default DsMenu;