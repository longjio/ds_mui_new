// src/pages/ButtonGroupPage.tsx

import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
// DsButtonGroup 및 DsButton 컴포넌트를 임포트합니다.
import { DsButtonGroup, DsButtonGroupProps } from '../components/button/DsButtonGroup';
import { DsButton } from '../components/button/DsButton'; // DsButtonGroup 내부에 사용될 버튼

const ButtonGroupPage = () => {
    const commonGroupProps: Partial<DsButtonGroupProps> = {
        // 여기에 모든 DsButtonGroup 예시에 공통적으로 적용하고 싶은 props를 넣을 수 있습니다.
    };

    return (
        <Stack spacing={4} sx={{ p: 2 }}>
            <Typography variant="h1" gutterBottom>
                Button Group
            </Typography>

            {/* Basic ButtonGroup (Contained, Primary - Default) */}
            <Box>
                <Typography variant="h6" gutterBottom>
                    Basic ButtonGroup (Contained, Primary)
                </Typography>
                <DsButtonGroup {...commonGroupProps} aria-label="Basic contained primary button group">
                    <DsButton>One</DsButton>
                    <DsButton>Two</DsButton>
                    <DsButton>Three</DsButton>
                </DsButtonGroup>
            </Box>

            {/* Outlined ButtonGroup */}
            <Box>
                <Typography variant="h6" gutterBottom>
                    Outlined ButtonGroup (Secondary)
                </Typography>
                <DsButtonGroup
                    {...commonGroupProps}
                    variant="outlined"
                    color="secondary"
                    aria-label="Outlined secondary button group"
                >
                    <DsButton variant="outlined">One</DsButton>
                    <DsButton variant="outlined">Two</DsButton>
                    <DsButton variant="outlined">Three</DsButton>
                </DsButtonGroup>
            </Box>

            {/* Text ButtonGroup */}
            <Box>
                <Typography variant="h6" gutterBottom>
                    Text ButtonGroup (Success)
                </Typography>
                <DsButtonGroup
                    {...commonGroupProps}
                    variant="text"
                    color="success"
                    aria-label="Text success button group"
                >
                    <DsButton variant="text">One</DsButton>
                    <DsButton variant="text">Two</DsButton>
                    <DsButton variant="text">Three</DsButton>
                </DsButtonGroup>
            </Box>

            {/* Sizes */}
            <Box>
                <Typography variant="h6" gutterBottom>
                    Button Group Sizes
                </Typography>
                <Stack direction="row" spacing={3} alignItems="center">
                    <DsButtonGroup {...commonGroupProps} size="small" aria-label="Small button group">
                        <DsButton size="small">S</DsButton>
                        <DsButton size="small">M</DsButton>
                        <DsButton size="small">L</DsButton>
                    </DsButtonGroup>
                    <DsButtonGroup {...commonGroupProps} size="medium" aria-label="Medium button group">
                        <DsButton size="medium">S</DsButton>
                        <DsButton size="medium">M</DsButton>
                        <DsButton size="medium">L</DsButton>
                    </DsButtonGroup>
                    <DsButtonGroup {...commonGroupProps} size="large" aria-label="Large button group">
                        <DsButton size="large">S</DsButton>
                        <DsButton size="large">M</DsButton>
                        <DsButton size="large">L</DsButton>
                    </DsButtonGroup>
                </Stack>
            </Box>

            {/* Vertical ButtonGroup */}
            <Box>
                <Typography variant="h6" gutterBottom>
                    Vertical ButtonGroup
                </Typography>
                <Stack direction="row" spacing={5}>
                    <DsButtonGroup
                        {...commonGroupProps}
                        orientation="vertical"
                        aria-label="Vertical contained primary button group"
                    >
                        <DsButton>Save</DsButton>
                        <DsButton>Edit</DsButton>
                        <DsButton>Delete</DsButton>
                    </DsButtonGroup>
                    <DsButtonGroup
                        {...commonGroupProps}
                        orientation="vertical"
                        variant="outlined"
                        color="error"
                        aria-label="Vertical outlined error button group"
                    >
                        <DsButton>Option A</DsButton>
                        <DsButton>Option B</DsButton>
                        <DsButton>Option C</DsButton>
                    </DsButtonGroup>
                </Stack>
            </Box>

            {/* Disabled ButtonGroup */}
            <Box>
                <Typography variant="h6" gutterBottom>
                    Disabled ButtonGroup
                </Typography>
                <DsButtonGroup {...commonGroupProps} disabled aria-label="Disabled button group">
                    <DsButton>Cannot Click</DsButton>
                    <DsButton>Me Neither</DsButton>
                </DsButtonGroup>
            </Box>

            {/* ButtonGroup with disableElevation */}
            <Box>
                <Typography variant="h6" gutterBottom>
                    Contained ButtonGroup (disableElevation)
                </Typography>
                <DsButtonGroup
                    {...commonGroupProps}
                    variant="contained"
                    disableElevation
                    aria-label="Contained button group with elevation disabled"
                >
                    <DsButton> Disable elevation One</DsButton>
                    <DsButton> Disable elevation Two</DsButton>
                </DsButtonGroup>
            </Box>

            {/* Full Width ButtonGroup */}
            <Box>
                <Typography variant="h6" gutterBottom>
                    Full Width ButtonGroup
                </Typography>
                <DsButtonGroup
                    {...commonGroupProps}
                    fullWidth
                    variant="outlined"
                    aria-label="Full width outlined button group"
                >
                    <DsButton>Column 1</DsButton>
                    <DsButton>Column 2</DsButton>
                    <DsButton>Column 3</DsButton>
                </DsButtonGroup>
            </Box>
        </Stack>
    );
};

export default ButtonGroupPage;