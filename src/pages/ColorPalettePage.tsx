// D:/ds_mui_new/src/pages/ColorPalettePage.tsx

import React from 'react';
import { Paper, Stack, Typography, Theme, Palette } from '@mui/material';
import DsGrid from '../components/layout/DsGrid';
import { TitleL, TitleS } from '../components/typography';
import { theme } from '../theme';

// 페이지의 Light/Dark 2단 레이아웃을 위해 DsGridItem은 유지합니다.
const DsGridItem: any = DsGrid;

// 개별 색상 정보를 보여주는 헬퍼 컴포넌트
const ColorBox = ({ colorName, hexCode, theme }: { colorName: string; hexCode: string; theme: Theme }) => {
    // getContrastText는 전체 테마 객체에 존재하므로, 그대로 사용 가능합니다.
    const textColor = theme.palette.getContrastText(hexCode);

    const nameParts = colorName.split('.');
    const hasTwoParts = nameParts.length === 2;

    return (
        <Paper
            variant="outlined"
            sx={{
                width: 100,
                height: 100,
                bgcolor: hexCode,
                color: textColor,
                p: 1.5,
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
                    fontSize: '0.8rem',
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
                    fontSize: '0.7rem',
                }}
            >
                {hexCode}
            </Typography>
        </Paper>
    );
};

// 특정 테마의 전체 팔레트를 표시하는 재사용 가능한 컴포넌트
const PaletteDisplay = ({ palette, modeTitle, baseTheme }: { palette: Palette, modeTitle: string, baseTheme: Theme }) => {
    const intentColors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'];
    const greyColors = Object.entries(palette.grey || {});

    return (
        <Stack spacing={4}>
            <TitleS>{modeTitle}</TitleS>

            {/* Main Palette */}
            <Stack spacing={2}>
                <Typography variant="overline" sx={{ fontSize: '10px' }}>Main Palette</Typography>
                <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                    {intentColors.flatMap((colorKey) => {
                        const colorObj = palette[colorKey as keyof Palette] as any;
                        if (!colorObj || !colorObj.main) return [];
                        return [
                            <ColorBox key={`${colorKey}.light`} colorName={`${colorKey}.light`} hexCode={colorObj.light} theme={baseTheme} />,
                            <ColorBox key={`${colorKey}.main`} colorName={`${colorKey}.main`} hexCode={colorObj.main} theme={baseTheme} />,
                            <ColorBox key={`${colorKey}.dark`} colorName={`${colorKey}.dark`} hexCode={colorObj.dark} theme={baseTheme} />
                        ];
                    })}
                </Stack>
            </Stack>

            {/* UI Colors */}
            <Stack spacing={2}>
                <Typography variant="overline" sx={{ fontSize: '10px' }}>UI Colors</Typography>
                <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                    <ColorBox colorName="text.primary" hexCode={palette.text.primary} theme={baseTheme} />
                    <ColorBox colorName="text.secondary" hexCode={palette.text.secondary} theme={baseTheme} />
                    <ColorBox colorName="background.default" hexCode={palette.background.default} theme={baseTheme} />
                    <ColorBox colorName="background.paper" hexCode={palette.background.paper} theme={baseTheme} />
                    <ColorBox colorName="action.active" hexCode={palette.action.active} theme={baseTheme} />
                    <ColorBox colorName="action.hover" hexCode={palette.action.hover} theme={baseTheme} />
                    <ColorBox colorName="action.selected" hexCode={palette.action.selected} theme={baseTheme} />
                    <ColorBox colorName="divider" hexCode={palette.divider} theme={baseTheme} />
                </Stack>
            </Stack>

            {/* Grey Scale */}
            <Stack spacing={2}>
                <Typography variant="overline" sx={{ fontSize: '10px' }}>Grey Scale</Typography>
                <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                    {greyColors.map(([key, value]) => (
                        <ColorBox key={key} colorName={`grey.${key}`} hexCode={value} theme={baseTheme} />
                    ))}
                </Stack>
            </Stack>
        </Stack>
    );
}

// 메인 컬러 팔레트 페이지
export default function ColorPalettePage() {
    // ★★★ 핵심 수정 사항 ★★★
    // `theme.colorSchemes`가 실제로 존재하는지 확인하여 타입 에러와 런타임 에러를 모두 방지합니다.
    if (!theme.colorSchemes?.light || !theme.colorSchemes?.dark) {
        return (
            <Stack spacing={5}>
                <TitleL>Color Palette</TitleL>
                <Typography color="error">
                    테마에 colorSchemes가 정의되지 않았습니다. theme.ts 파일을 확인해주세요.
                </Typography>
            </Stack>
        );
    }

    // 위에서 존재 여부를 확인했으므로, 이제 TypeScript는 이 값들이 안전하다고 인식합니다.
    const lightPalette = {
        ...theme.colorSchemes.light.palette,
        grey: theme.palette.grey, // 공통 grey 스케일 추가
    } as Palette;

    const darkPalette = {
        ...theme.colorSchemes.dark.palette,
        grey: theme.palette.grey, // 공통 grey 스케일 추가
    } as Palette;

    return (
        <Stack spacing={5}>
            <TitleL>Color Palette</TitleL>
            <DsGrid container spacing={{ xs: 5, lg: 4 }}>
                <DsGridItem item xs={12} lg={6}>
                    <PaletteDisplay palette={lightPalette} modeTitle="Light Mode" baseTheme={theme} />
                </DsGridItem>
                <DsGridItem item xs={12} lg={6}>
                    <PaletteDisplay palette={darkPalette} modeTitle="Dark Mode" baseTheme={theme} />
                </DsGridItem>
            </DsGrid>
        </Stack>
    );
}