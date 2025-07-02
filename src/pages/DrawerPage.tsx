// src/pages/DrawerPage.tsx (DsDrawer 사용 예시)

import React, { useState } from 'react';
import {
    Box,
    Button,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
// 방금 만든 재사용 가능한 DsDrawer 컴포넌트를 import 합니다.
import DsDrawer from '../components/navigation/DsDrawer';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const DrawerPage = () => {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setState({ ...state, [anchor]: open });
            };

    // Drawer 내부에 표시될 컨텐츠
    const drawerContent = (
        <>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h1" gutterBottom>Drawer</Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Drawer는 화면의 가장자리에서 일시적으로 나타나는 내비게이션 패널입니다.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button variant="contained" onClick={toggleDrawer(anchor, true)}>
                            Open {anchor}
                        </Button>
                        {/* DsDrawer 컴포넌트를 사용하여 간결하게 표현 */}
                        <DsDrawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {drawerContent}
                        </DsDrawer>
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    );
};

export default DrawerPage;