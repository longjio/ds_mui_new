// src/pages/ButtonPage.tsx
import React from 'react'; // useState 제거
import { Stack, Typography } from '@mui/material'; // Box, Switch, FormControlLabel 제거
// DsButton 컴포넌트를 임포트합니다. (경로는 실제 프로젝트 구조에 맞게 조정해주세요)
import { DsButton, DsButtonProps } from '../components/button/DsButton';

const ButtonPage = () => {
    // isLoading, showText 상태 및 핸들러 제거

    const commonButtonProps: Partial<DsButtonProps> = {
        // 여기에 모든 DsButton 예시에 공통적으로 적용하고 싶은 props를 넣을 수 있습니다.
        // 예: fullWidth: true
    };

    return (
        <Stack spacing={4} sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Button
            </Typography>

            {/* 토글 스위치 Box 제거 */}

            {/* Variant: Contained (기본값) */}
            <Typography variant="h6">Contained Buttons (Default Variant)</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
                <DsButton {...commonButtonProps} color="primary" loading={false}> {/* isLoading -> false */}
                    Primary {/* showText 조건 제거 */}
                </DsButton>
                <DsButton {...commonButtonProps} color="secondary" loading={false} loadingPosition="end">
                    Secondary End
                </DsButton>
                <DsButton {...commonButtonProps} color="success" disabled>
                    Success Disabled
                </DsButton>
                <DsButton {...commonButtonProps} href="#contained-link" color="error">
                    Error Link
                </DsButton>
                <DsButton {...commonButtonProps} loading={true} loadingPosition="center" aria-label="Contained loading only" />
            </Stack>

            {/* Variant: Outlined */}
            <Typography variant="h6">Outlined Buttons</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
                <DsButton {...commonButtonProps} variant="outlined" color="primary" loading={false}>
                    Primary Outlined
                </DsButton>
                <DsButton {...commonButtonProps} variant="outlined" color="warning" loading={false} loadingPosition="end">
                    Warning End
                </DsButton>
                <DsButton {...commonButtonProps} variant="outlined" disabled>
                    Outlined Disabled
                </DsButton>
                <DsButton {...commonButtonProps} variant="outlined" href="#outlined-link" color="info">
                    Info Link
                </DsButton>
                <DsButton {...commonButtonProps} variant="outlined" loading={true} loadingPosition="center" aria-label="Outlined loading only" />
            </Stack>

            {/* Variant: Text */}
            <Typography variant="h6">Text Buttons</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
                <DsButton {...commonButtonProps} variant="text" color="primary" loading={false}>
                    Primary Text
                </DsButton>
                <DsButton {...commonButtonProps} variant="text" loading={false} loadingPosition="end">
                    Default End
                </DsButton>
                <DsButton {...commonButtonProps} variant="text" disabled>
                    Text Disabled
                </DsButton>
                <DsButton {...commonButtonProps} variant="text" href="#text-link" color="inherit">
                    Inherit Link
                </DsButton>
                <DsButton {...commonButtonProps} variant="text" loading={true} loadingPosition="center" aria-label="Text loading only" />
            </Stack>

            {/* Sizes */}
            <Typography variant="h6">Button Sizes</Typography>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                <DsButton {...commonButtonProps} size="small" loading={false}>
                    Small
                </DsButton>
                <DsButton {...commonButtonProps} size="medium" loading={false} loadingPosition="end">
                    Medium (Default)
                </DsButton>
                <DsButton {...commonButtonProps} size="large" loading={false}>
                    Large
                </DsButton>
            </Stack>

            {/* Custom Loading Indicator */}
            <Typography variant="h6">Custom Loading Indicator</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
                <DsButton
                    {...commonButtonProps}
                    loading={false} // 또는 true로 고정하여 항상 로딩 인디케이터를 볼 수 있게 할 수 있습니다.
                    loadingIndicator={<Typography variant="caption">Wait...</Typography>}
                >
                    Custom Load
                </DsButton>
            </Stack>

            {/* Full Width Button Example */}
            <Typography variant="h6">Full Width Button</Typography>
            <DsButton {...commonButtonProps} fullWidth loading={false}>
                Full Width Button
            </DsButton>

        </Stack>
    );
};

export default ButtonPage;