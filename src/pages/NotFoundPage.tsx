import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                p: 3,
            }}
        >
            <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold' }}>
                404
            </Typography>
            <Typography variant="h5" sx={{ my: 2 }}>
                페이지를 찾을 수 없습니다.
            </Typography>
            <Typography color="text.secondary">
                요청하신 페이지가 존재하지 않거나, 현재 사용할 수 없습니다.
            </Typography>
            <Button component={Link} to="/" variant="contained" sx={{ mt: 4 }}>
                홈으로 돌아가기
            </Button>
        </Box>
    );
}