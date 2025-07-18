// D:/ds_mui_new/src/layouts/DrawerContent.tsx

import React, { useState } from 'react';
import { List, ListItemButton, ListItemText, Collapse, Box } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { MenuItem, MenuGroup } from '../types/menu';

interface DrawerContentProps {
    onMenuClick: (item: MenuItem) => void;
    // MainLayout에서 직접 데이터를 받도록 props를 수정합니다.
    menuData: MenuGroup[];
}

export default function DrawerContent({ onMenuClick, menuData }: DrawerContentProps) {
    // [핵심] 각 메뉴 그룹의 열림 상태를 '개별적으로' 관리하는 객체를 만듭니다.
    const [openState, setOpenState] = useState<Record<string, boolean>>({
        'group-foundations': true, // Foundations 그룹은 기본적으로 열어둡니다.
    });

    // 클릭된 그룹의 ID를 받아, 해당 그룹의 상태만 토글하는 함수입니다.
    const handleToggle = (groupId: string) => {
        setOpenState(prevState => ({
            ...prevState,
            [groupId]: !prevState[groupId],
        }));
    };

    return (
        <Box sx={{ overflowY: 'auto', overflowX: 'hidden', height: '100%' }}>
            <List component="nav">
                {menuData.map((group: MenuGroup) => (
                    // 메뉴 아이템이 하나라도 있을 때만 그룹을 렌더링합니다.
                    group.items.length > 0 && (
                        <React.Fragment key={group.id}>
                            <ListItemButton onClick={() => handleToggle(group.id)}>
                                <ListItemText primary={group.title} primaryTypographyProps={{ fontWeight: 'bold' }} />
                                {/* 현재 그룹의 열림 상태(openState[group.id])에 따라 아이콘이 결정됩니다. */}
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