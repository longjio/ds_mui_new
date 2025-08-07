// D:/ds_mui_new/src/mobile/template/MobileBoardWrite.tsx

import React, { useState, useRef } from 'react'; // ★ 1. useRef를 import 합니다.
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
    List,          // ★ 2. 파일 목록을 위한 컴포넌트들을 import 합니다.
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Divider,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile'; // ★ 3. 아이콘을 import 합니다.
import CloseIcon from '@mui/icons-material/Close';
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
    const fileInputRef = useRef<HTMLInputElement>(null); // ★ 4. file input에 접근하기 위한 ref를 생성합니다.

    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState<File[]>([]); // ★ 5. 첨부된 파일 목록을 관리할 state를 추가합니다.
    const [isDialogOpen, setDialogOpen] = useState(false);

    // ★ 6. 파일 선택 시 실행될 핸들러를 추가합니다.
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            // 새로 선택된 파일들을 기존 파일 목록에 추가합니다.
            setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files!)]);
        }
    };

    // ★ 7. 파일 목록에서 특정 파일을 제거하는 핸들러를 추가합니다.
    const handleRemoveFile = (fileToRemove: File) => {
        setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
    };

    const handleSave = () => {
        // 실제 저장 로직을 여기에 구현합니다.
        // FormData를 사용하여 파일과 다른 데이터를 함께 서버로 보낼 수 있습니다.
        console.log({ category, title, content, files });
        alert('게시글이 저장되었습니다.');
        navigate(-1); // 목록 페이지로 돌아가기
    };

    const handleCancel = () => {
        // ★ 내용 또는 첨부파일이 있으면 확인 다이얼로그를 띄웁니다.
        if (title || content || files.length > 0) {
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
            <MobileHeader title="글쓰기" leftIcon="back" rightIcon="none" />

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
                        required
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

                    {/* ★ 8. 파일 첨부 UI 추가 */}
                    <Stack spacing={1}>
                        <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }} // input 필드는 숨깁니다.
                        />
                        <DsButton
                            variant="outlined"
                            color="inherit"
                            startIcon={<AttachFileIcon />}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            파일 첨부
                        </DsButton>

                        {files.length > 0 && (
                            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, mt: 1 }}>
                                <List dense>
                                    {files.map((file, index) => (
                                        <React.Fragment key={index}>
                                            <ListItem
                                                secondaryAction={
                                                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(file)}>
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                }
                                            >
                                                <ListItemText
                                                    primary={file.name}
                                                    secondary={`${(file.size / 1024).toFixed(2)} KB`}
                                                    primaryTypographyProps={{ variant: 'body2', noWrap: true }}
                                                />
                                            </ListItem>
                                            {index < files.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Stack>
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