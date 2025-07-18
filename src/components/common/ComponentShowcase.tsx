import React, { useState } from 'react';
import { Box, Typography, Paper, Divider, IconButton, Tooltip } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

interface ComponentShowcaseProps {
    title: string;
    description: React.ReactNode;
    component: React.ReactNode;
    code: string;
}

export default function ComponentShowcase({ title, description, component, code }: ComponentShowcaseProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // 2초 후에 원래 아이콘으로 복귀
        });
    };

    return (
        <Paper variant="outlined" sx={{ mb: 4 }}>
            {/* 1. 제목과 설명 섹션 */}
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </Box>

            <Divider />

            {/* 2. 실제 컴포넌트가 렌더링되는 예제 섹션 */}
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                {component}
            </Box>

            {/* 3. 코드를 보여주고 복사하는 섹션 */}
            <Box sx={{ position: 'relative', bgcolor: '#2d2d2d' }}>
                <Tooltip title={isCopied ? '복사 완료!' : '코드 복사'}>
                    <IconButton
                        onClick={handleCopy}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                        }}
                    >
                        {isCopied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                    </IconButton>
                </Tooltip>
                <SyntaxHighlighter
                    language="tsx"
                    style={vscDarkPlus}
                    showLineNumbers
                    customStyle={{
                        margin: 0,
                        borderRadius: '0 0 4px 4px',
                        border: 'none',
                        paddingTop: '40px', // 아이콘 공간 확보
                    }}
                >
                    {code.trim()}
                </SyntaxHighlighter>
            </Box>
        </Paper>
    );
}