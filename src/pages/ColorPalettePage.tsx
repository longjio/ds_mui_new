// D:/ds_mui_new/src/pages/ColorPalettePage.tsx

import React from 'react';
import { Paper, Stack, Typography, Theme } from '@mui/material';
import DsGrid from '../components/layout/DsGrid';
import { TitleL, TitleS } from '../components/typography';
import { getTheme } from '../theme';

// 페이지의 Light/Dark 2단 레이아웃을 위해 DsGridItem은 유지합니다.
const DsGridItem: any = DsGrid;

// ★★★ 핵심 수정 사항 (1/2) ★★★
// 개별 색상 정보를 보여주는 헬퍼 컴포넌트
// 컬러 칩의 크기를 고정하고, 내부 폰트와 여백을 재조정합니다.
const ColorBox = ({ colorName, hexCode, theme }: { colorName: string; hexCode: string; theme: Theme }) => {
    const textColor = theme.palette.getContrastText(hexCode);

    const nameParts = colorName.split('.');
    const hasTwoParts = nameParts.length === 2;

    return (
        <Paper
            variant="outlined"
            sx={{
                // --- 고정 크기 설정 ---
                width: 100,
                height: 100,
                // --- 나머지 스타일 ---
                bgcolor: hexCode,
                color: textColor,
                p: 1.5, // 고정 패딩
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
            }}
        >
            <Typography
                sx={{
                    fontWeight: 'bold',
                    lineHeight: 1.2,
                    fontSize: '0.8rem', // 고정 폰트 크기
                }}
            >
                {hasTwoParts ? (
                    <>
                        {nameParts[0]}
                        <br />
                        .{nameParts[1]}
                    </>
                ) : (
                    colorName
                )}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    mt: 0.5,
                    fontSize: '0.7rem', // 고정 폰트 크기
                }}
            >
                {hexCode}
            </Typography>
        </Paper>
    );
};

// ★★★ 핵심 수정 사항 (2/2) ★★★
// 특정 테마의 전체 팔레트를 표시하는 재사용 가능한 컴포넌트
// DsGrid 대신 Stack을 사용하여 고정 크기 아이템을 배치합니다.
const PaletteDisplay = ({ theme, modeTitle }: { theme: Theme, modeTitle: string }) => {
    const { palette } = theme;
    const intentColors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'];
    const greyColors = Object.entries(palette.grey);

    return (
        <Stack spacing={4}>
            <TitleS>{modeTitle}</TitleS>

            {/* Main Palette */}
            <Stack spacing={2}>
                <Typography variant="overline" sx={{ fontSize: '10px' }}>Main Palette</Typography>
                <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                    {intentColors.flatMap((colorKey) => {
                        const colorObj = palette[colorKey as keyof typeof palette] as any;
                        if (!colorObj || !colorObj.main) return [];
                        return [
                            <ColorBox key={`${colorKey}.light`} colorName={`${colorKey}.light`} hexCode={colorObj.light} theme={theme} />,
                            <ColorBox key={`${colorKey}.main`} colorName={`${colorKey}.main`} hexCode={colorObj.main} theme={theme} />,
                            <ColorBox key={`${colorKey}.dark`} colorName={`${colorKey}.dark`} hexCode={colorObj.dark} theme={theme} />
                        ];
                    })}
                </Stack>
            </Stack>

            {/* UI Colors */}
            <Stack spacing={2}>
                <Typography variant="overline" sx={{ fontSize: '10px' }}>UI Colors</Typography>
                <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                    <ColorBox colorName="text.primary" hexCode={palette.text.primary} theme={theme} />
                    <ColorBox colorName="text.secondary" hexCode={palette.text.secondary} theme={theme} />
                    <ColorBox colorName="background.default" hexCode={palette.background.default} theme={theme} />
                    <ColorBox colorName="background.paper" hexCode={palette.background.paper} theme={theme} />
                    <ColorBox colorName="action.active" hexCode={palette.action.active} theme={theme} />
                    <ColorBox colorName="action.hover" hexCode={palette.action.hover} theme={theme} />
                    <ColorBox colorName="action.selected" hexCode={palette.action.selected} theme={theme} />
                    <ColorBox colorName="divider" hexCode={palette.divider} theme={theme} />
                </Stack>
            </Stack>

            {/* Grey Scale */}
            <Stack spacing={2}>
                <Typography variant="overline" sx={{ fontSize: '10px' }}>Grey Scale</Typography>
                <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                    {greyColors.map(([key, value]) => (
                        <ColorBox key={key} colorName={`grey.${key}`} hexCode={value} theme={theme} />
                    ))}
                </Stack>
            </Stack>
        </Stack>
    );
}

// 메인 컬러 팔레트 페이지
export default function ColorPalettePage() {
    const lightTheme = getTheme('light');
    const darkTheme = getTheme('dark');

    return (
        <Stack spacing={5}>
            <TitleL>Color Palette</TitleL>
            <DsGrid container spacing={{ xs: 5, lg: 4 }}>
                <DsGridItem item xs={12} lg={6}>
                    <PaletteDisplay theme={lightTheme} modeTitle="Light Mode" />
                </DsGridItem>
                <DsGridItem item xs={12} lg={6}>
                    <PaletteDisplay theme={darkTheme} modeTitle="Dark Mode" />
                </DsGridItem>
            </DsGrid>
        </Stack>
    );
}