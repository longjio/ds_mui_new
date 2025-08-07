// D:/ds_mui_new/src/mobile/template/MobileUserEdit.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Stack,
    SelectChangeEvent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { DsTextField } from '../../components/input/DsTextField';
import { DsSelect, DsSelectItem } from '../../components/input/DsSelect';
import { DsButton } from '../../components/button/DsButton';
import MobileHeader from '../components/MobileHeader';
import { TitleS } from '../../components/typography';

// User 타입과 샘플 데이터는 MobileUserDetail.tsx와 동일하게 사용합니다.
interface User {
    id: string;
    loginId: string;
    name:string;
    system: string;
    company: string;
    isUsed: 'Y' | 'N';
}

const sampleUsers: User[] = [
    { id: 'user001', loginId: 'user001', name: '홍길동', system: 'DS MUI NEW', company: '본사', isUsed: 'Y' },
    { id: 'user002', loginId: 'user002', name: '이순신', system: 'DS MUI NEW', company: '자회사 A', isUsed: 'Y' },
    { id: 'user003', loginId: 'user003', name: '유관순', system: '레거시 시스템', company: '자회사 B', isUsed: 'N' },
    { id: 'user004', loginId: 'user004', name: '세종대왕', system: 'DS MUI NEW', company: '본사', isUsed: 'Y' },
];

// Select 옵션 데이터
const systemOptions: DsSelectItem[] = [
    { value: 'DS MUI NEW', label: 'DS MUI NEW' },
    { value: 'legacy_system', label: '레거시 시스템' },
];

const companyOptions: DsSelectItem[] = [
    { value: '본사', label: '본사' },
    { value: '자회사 A', label: '자회사 A' },
    { value: '자회사 B', label: '자회사 B' },
];

const usageStatusOptions: DsSelectItem[] = [
    { value: 'Y', label: '사용' },
    { value: 'N', label: '미사용' },
];

export default function MobileUserEditPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [formState, setFormState] = useState<Partial<User>>({});
    const [isSaveDialogOpen, setSaveDialogOpen] = useState(false);

    useEffect(() => {
        const foundUser = sampleUsers.find(u => u.id === id);
        if (foundUser) {
            setUser(foundUser);
            setFormState(foundUser);
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: String(value) }));
    };

    const handleSave = () => {
        // 실제 앱에서는 여기서 API를 호출하여 데이터를 업데이트합니다.
        console.log('저장될 데이터:', formState);
        setSaveDialogOpen(true);
    };

    const handleCloseSaveDialog = () => {
        setSaveDialogOpen(false);
        // 저장 후 상세 페이지로 돌아갑니다.
        navigate(`/m/user-management/${id}`);
    };

    if (!user) {
        return (
            <Box>
                <MobileHeader title="사용자 정보 수정" leftIcon="back" />
                <Box sx={{ p: 2 }}>
                    <TitleS>사용자를 찾을 수 없습니다.</TitleS>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
            <MobileHeader title="사용자 정보 수정" leftIcon="back" />

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4 }}>
                <Stack spacing={4}>
                    <DsTextField
                        label="로그인 ID"
                        value={formState.loginId || ''}
                        disabled // ID는 보통 수정하지 않음
                        fullWidth
                    />
                    <DsTextField
                        name="name"
                        label="이름"
                        value={formState.name || ''}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                    <DsSelect
                        name="system"
                        label="시스템"
                        value={formState.system || ''}
                        onChange={handleSelectChange}
                        items={systemOptions}
                        fullWidth
                        required
                    />
                    <DsSelect
                        name="company"
                        label="회사"
                        value={formState.company || ''}
                        onChange={handleSelectChange}
                        items={companyOptions}
                        fullWidth
                        required
                    />
                    <DsSelect
                        name="isUsed"
                        label="상태"
                        value={formState.isUsed || ''}
                        onChange={handleSelectChange}
                        items={usageStatusOptions}
                        fullWidth
                        required
                    />
                </Stack>
            </Box>

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Stack direction="row" spacing={1}>
                    <DsButton variant="outlined" onClick={() => navigate(-1)} fullWidth size="xlarge">취소</DsButton>
                    <DsButton variant="contained" onClick={handleSave} fullWidth size="xlarge">저장</DsButton>
                </Stack>
            </Box>

            {/* 저장 완료 다이얼로그 */}
            <Dialog
                open={isSaveDialogOpen}
                onClose={handleCloseSaveDialog}
            >
                <DialogTitle>저장 완료</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        사용자 정보가 성공적으로 수정되었습니다.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DsButton onClick={handleCloseSaveDialog} autoFocus>
                        확인
                    </DsButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}