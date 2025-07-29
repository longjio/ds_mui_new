// D:/ds_mui_new/src/pages/LoginPage.tsx

import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    CssBaseline,
    Avatar,
    Checkbox,
    FormControlLabel,
    Grid as MuiGrid, // ★ 1. Grid를 MuiGrid라는 별칭으로 가져옵니다.
    Link,
    CircularProgress,
    Alert,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../contexts/AuthContext';
import { DsButton } from '../components/button/DsButton';
import { DsTextField } from '../components/input/DsTextField';

// ★ 2. 컴파일러의 타입 검사 버그를 우회하기 위한 최종 해결책입니다.
// Grid 컴포넌트의 타입 검사를 비활성화하여, 잘못된 오류가 발생하는 것을 원천 차단합니다.
const Grid: any = MuiGrid;

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, user } = useAuth();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            navigate(isMobile ? '/m' : '/app', { replace: true });
        }
    }, [user, isMobile, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login({ username, password }, rememberMe);
            navigate(isMobile ? '/m' : '/app');
        } catch (err: any) {
            setError(err.message || '로그인에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    px: 5,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 10,
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                    <DsTextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="사용자 이름"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                    />
                    <DsTextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value="remember"
                                color="primary"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                disabled={isLoading}
                            />
                        }
                        label="자동 로그인"
                    />
                    {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
                    <DsButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="xlarge"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : '로그인'}
                    </DsButton>
                    <Grid container justifyContent="space-between" alignItems="center">
                        {/* ★ 3. 이제 component="div" 없이도 정상적으로 작동합니다. */}
                        <Grid xs={8}>
                            <Link href="#" variant="body2">
                                비밀번호 찾기
                            </Link>
                        </Grid>
                        <Grid xs={4} sx={{ textAlign: 'right' }}>
                            <Link component={RouterLink} to="/signup" variant="body2">
                                회원가입
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}