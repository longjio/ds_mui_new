// D:/ds_mui_new/src/layouts/DrawerContent.tsx

import React, { useState } from 'react';
import {
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Box,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// [핵심 1] 더 이상 내부적으로 useMenu 훅을 사용하지 않습니다.
import { MenuItem, MenuGroup } from '../types/menu';

interface DrawerContentProps {
    onMenuClick: (item: MenuItem) => void;
    // [핵심 2] MainLayout에서 직접 데이터를 받도록 props 타입을 명시합니다.
    menuData: MenuGroup[];
}

export default function DrawerContent({ onMenuClick, menuData }: DrawerContentProps) {
    const [openState, setOpenState] = useState<Record<string, boolean>>({
        'group-foundations': true,
        'group-components': true, // Components 그룹도 기본적으로 열어둡니다.
    });

    const handleToggle = (groupId: string) => {
        setOpenState(prevState => ({
            ...prevState,
            [groupId]: !prevState[groupId],
        }));
    };

    return (
        <Box sx={{ overflowY: 'auto', overflowX: 'hidden', height: '100%' }}>
            <List component="nav">
                {/* [핵심 3] props로 받은 menuData를 사용하여 UI를 그립니다. */}
                {menuData.map((group: MenuGroup) => (
                    // 메뉴 아이템이 하나라도 있을 때만 그룹을 렌더링합니다.
                    group.items.length > 0 && (
                        <React.Fragment key={group.id}>
                            <ListItemButton onClick={() => handleToggle(group.id)}>
                                <ListItemText primary={group.title} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                {openState[group.id] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openState[group.id]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {group.items.map((item) => (
                                        <ListItemButton key={item.id} sx={{ pl: 4 }} onClick={() => onMenuClick(item)}>
                                            <ListItemText primary={item.text} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    )
                ))}
            </List>
        </Box>
    );
}