// D:/ds_mui_new/src/components/navigation/DsMenu.tsx

import React from 'react';
import {
    Menu as MuiMenu,
    MenuItem as MuiMenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    MenuProps as MuiMenuProps,
} from '@mui/material';
// [수정] 'DsMenuItem'을 표준 타입인 'MenuItem'으로 변경합니다.
import { MenuItem } from '../../types/menu';

// DsMenu 컴포넌트가 받을 props 타입을 정의합니다.
interface DsMenuProps extends Omit<MuiMenuProps, 'open' | 'onClose' | 'anchorEl'> {
    isOpen: boolean;
    onClose: () => void;
    anchorEl: HTMLElement | null;
    // [수정] 여기에서도 'MenuItem'을 사용합니다.
    items: MenuItem[];
    onItemClick?: (item: MenuItem) => void;
}

export default function DsMenu({
                                   isOpen,
                                   onClose,
                                   anchorEl,
                                   items,
                                   onItemClick,
                                   ...props
                               }: DsMenuProps) {
    const handleItemClick = (item: MenuItem) => {
        if (onItemClick) {
            onItemClick(item);
        }
        onClose();
    };

    return (
        <MuiMenu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={onClose}
            onClick={onClose}
            {...props}
        >
            {items.map((item) => (
                <MuiMenuItem key={item.id} onClick={() => handleItemClick(item)}>
                    {/* 아이콘이 있다면 아이콘을 렌더링합니다. */}
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText>{item.text}</ListItemText>
                </MuiMenuItem>
            ))}
        </MuiMenu>
    );
}