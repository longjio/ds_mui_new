// D:/ds_mui_new/src/mobile/template/MobileBoardWrite.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

// 게시판 카테고리 옵션
const categoryOptions: DsSelectItem[] = [
    { value: '자유', label: '자유' },
    { value: '질문', label: '질문' },
    { value: '정보', label: '정보' },
];

export default function MobileBoardWritePage() {
    const navigate = useNavigate();

    // ★★★ 핵심 수정 사항 ★★★
    // 초기값을 '자유'가 아닌 빈 문자열('')로 설정하여
    // 동적 라벨이 정상적으로 작동하도록 합니다.
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleSave = () => {
        // 실제 저장 로직을 여기에 구현합니다.
        console.log({ category, title, content });
        alert('게시글이 저장되었습니다.');
        navigate(-1); // 목록 페이지로 돌아가기
    };

    const handleCancel = () => {
        // 내용이 있으면 확인 다이얼로그를 띄웁니다.
        if (title || content) {
            setDialogOpen(true);
        } else {
            navigate(-1); // 내용이 없으면 바로 돌아가기
        }
    };

    const handleConfirmCancel = () => {
        setDialogOpen(false);
        navigate(-1);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
            <MobileHeader title="글쓰기" leftIcon="none" />

            {/* 콘텐츠 영역 */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4 }}>
                <Stack spacing={3}>
                    <DsSelect
                        id="category-select"
                        label="카테고리"
                        value={category}
                        onChange={(e: SelectChangeEvent<string | number>) => setCategory(e.target.value as string)}
                        items={categoryOptions}
                        fullWidth
                    />
                    <DsTextField
                        id="title-input"
                        label="제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        fullWidth
                        required
                    />
                    <DsTextField
                        id="content-input"
                        label="내용"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                        fullWidth
                        required
                        multiline
                        rows={10}
                    />
                </Stack>
            </Box>

            {/* 하단 버튼 영역 */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Stack direction="row" spacing={1}>
                    <DsButton variant="outlined" onClick={handleCancel} fullWidth size="xlarge">취소</DsButton>
                    <DsButton variant="contained" onClick={handleSave} fullWidth size="xlarge">저장</DsButton>
                </Stack>
            </Box>

            {/* 취소 확인 다이얼로그 */}
            <Dialog
                open={isDialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                <DialogTitle>작성 취소</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        작성중인 내용이 사라집니다. 정말로 취소하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DsButton onClick={() => setDialogOpen(false)} variant="text">계속 작성</DsButton>
                    <DsButton onClick={handleConfirmCancel} color="primary" autoFocus>
                        나가기
                    </DsButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}