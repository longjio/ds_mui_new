import React from 'react';
import {
    Drawer,
    Box,
    Stack,
    Chip,
    IconButton,
    Toolbar,
    Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DsButton } from '../../components/button/DsButton';
import { TitleS, BodyM, BodyS } from '../../components/typography';

// 1. MobileList.tsx와 데이터 일관성을 맞추기 위해 hasPersonalInfo 속성을 추가합니다.
interface Menu {
    id: number;
    menuName: string;
    path: string | null;
    isUsed: boolean;
    menuDescription: string;
    hasPersonalInfo: boolean;
}

interface MobileDetailProps {
    open: boolean;
    onClose: () => void;
    menu: Menu | null;
}

export default function MobileDetail({ open, onClose, menu }: MobileDetailProps) {
    if (!menu) {
        return null;
    }

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    height: '90vh',
                    maxHeight: '700px',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                },
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* 2. Toolbar의 sx prop에 좌우 패딩(px)을 '10px'로 추가합니다. */}
                <Toolbar disableGutters sx={{ flexShrink: 0, px: '20px' }}>
                    <TitleS component="div" sx={{ flexGrow: 1 }}>
                        {menu.menuName}
                    </TitleS>
                    <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
                <Divider />

                <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1 }}>
                    <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <BodyM>상태</BodyM>
                            <Chip label={menu.isUsed ? '사용' : '미사용'} color={menu.isUsed ? 'success' : 'default'} size="small"/>
                        </Stack>
                        <Divider />
                        {/* 3. 개인정보 필드를 추가하여 목록과 상세 정보의 일관성을 유지합니다. */}
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <BodyM>개인정보</BodyM>
                            <Chip
                                label={menu.hasPersonalInfo ? '포함' : '미포함'}
                                color={menu.hasPersonalInfo ? 'error' : 'default'}
                                variant="outlined"
                                size="small"
                                disabled={!menu.hasPersonalInfo}
                            />
                        </Stack>
                        <Divider />
                        <Stack direction="row" justifyContent="space-between">
                            <BodyM>메뉴 ID</BodyM>
                            <BodyM sx={{ color: 'text.secondary' }}>{menu.id}</BodyM>
                        </Stack>
                        <Divider />
                        <Stack direction="row" justifyContent="space-between">
                            <BodyM>경로</BodyM>
                            <BodyM sx={{ color: 'text.secondary' }}>{menu.path || 'N/A'}</BodyM>
                        </Stack>
                        <Divider />
                        <Stack spacing={1}>
                            <BodyM>설명</BodyM>
                            <BodyS sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
                                {menu.menuDescription}
                            </BodyS>
                        </Stack>
                    </Stack>
                </Box>

                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', flexShrink: 0 }}>
                    <DsButton fullWidth variant="contained" size="xlarge" onClick={onClose}>
                        확인
                    </DsButton>
                </Box>
            </Box>
        </Drawer>
    );
}