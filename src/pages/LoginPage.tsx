import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Typography,
    Container,
    CssBaseline,
    Avatar,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../contexts/AuthContext';
import { DsButton } from '../components/button/DsButton';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    // 사용자가 이미 로그인했다면 메인 페이지로 리디렉션합니다.
    useEffect(() => {
        if (user) {
            navigate('/app');
        }
    }, [user, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await login({ username, password }, rememberMe);
        } catch (error) {
            console.error("Login failed:", error);
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    로그인
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
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
                    />
                    <TextField
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
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value="remember"
                                color="primary"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                        }
                        label="자동 로그인"
                    />
                    <DsButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        로그인
                    </DsButton>
                    <Grid container justifyContent="space-between">
                        <Grid>
                            <Link href="#" variant="body2">
                                비밀번호 찾기
                            </Link>
                        </Grid>
                        <Grid>
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
