// D:/ds_mui_new/src/pages/SignupPage.tsx

import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, CircularProgress, Alert, Link } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';


export default function SignupPage() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { signup } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        setIsLoading(true);
        try {
            // 쇼케이스 페이지에서는 실제 회원가입 로직을 비활성화할 수도 있습니다.
            // 여기서는 설명을 위해 기존 로직을 유지합니다.
            await signup(id, password, name);

            setSuccess('회원가입에 성공했습니다! 로그인 페이지로 이동합니다.');
            setTimeout(() => navigate('/'), 2000);
        } catch (err: any) {
            setError(err.message || '회원가입에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                // [수정] 전체 화면 높이(100vh)를 차지하는 대신,
                // 레이아웃 내에서 자연스럽게 콘텐츠 높이만큼만 차지하도록 변경합니다.
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // 상단과 하단에 여백을 주어 다른 UI 요소(AppBar, Tabs 등)와 겹치지 않게 합니다.
                pt: 8,
                pb: 8,
            }}
        >
            <Typography component="h1" variant="h5">
                회원가입
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%', maxWidth: '320px' }}>
                <TextField margin="normal" required fullWidth id="id" label="아이디" name="id" value={id} onChange={e => setId(e.target.value)} />
                <TextField margin="normal" required fullWidth id="name" label="이름" name="name" value={name} onChange={e => setName(e.target.value)} />
                <TextField margin="normal" required fullWidth name="password" label="비밀번호" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                <TextField margin="normal" required fullWidth name="confirmPassword" label="비밀번호 확인" type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

                {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mt: 2, width: '100%' }}>{success}</Alert>}

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, height: '48px' }} disabled={isLoading || !!success}>
                    {isLoading ? <CircularProgress size={24} /> : '가입하기'}
                </Button>
                <Box sx={{ textAlign: 'right' }}>
                    <Link component={RouterLink} to="/" variant="body2">
                        이미 계정이 있으신가요? 로그인
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}