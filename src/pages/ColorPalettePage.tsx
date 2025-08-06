import React from 'react';
import { getTheme } from '../theme';
import { Palette, PaletteColor } from '@mui/material/styles';
import { Box, Paper, Typography, Stack, Divider } from '@mui/material';
import { TitleL } from '../components/typography';

// 단일 색상을 표시하는 컴포넌트 (변경 없음)
const ColorBox = ({ color, name }: { color?: string; name: string }) => (
    <Box sx={{ textAlign: 'center' }}>
        <Paper
            variant="outlined"
            sx={{
                bgcolor: color,
                width: 80,
                height: 80,
                borderRadius: 1,
                border: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        />
        <Typography variant="caption" display="block" mt={1} sx={{ wordBreak: 'break-all' }}>
            {name}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
            {color}
        </Typography>
    </Box>
);

// light/main/dark 구조를 가진 색상 그룹을 표시하는 컴포넌트 (변경 없음)
const PaletteSection = ({ title, paletteColor }: { title: string; paletteColor?: PaletteColor }) => {
    if (!paletteColor) return null;
    return (
        <Box>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                {'light' in paletteColor && <ColorBox color={paletteColor.light} name="light" />}
                {'main' in paletteColor && <ColorBox color={paletteColor.main} name="main" />}
                {'dark' in paletteColor && <ColorBox color={paletteColor.dark} name="dark" />}
            </Stack>
        </Box>
    );
};

// [핵심 수정] colors prop의 타입을 더 명확하고 안전하게 변경합니다.
const SimpleColorSection = ({ title, colors }: { title: string; colors: Palette['text'] | Palette['background'] }) => (
    <Box>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            {Object.entries(colors).map(([name, color]) => (
                <ColorBox key={name} color={color} name={name} />
            ))}
        </Stack>
    </Box>
);


// 메인 페이지 컴포넌트
const ColorPalettePage = () => {
    const lightTheme = getTheme('light');
    const darkTheme = getTheme('dark');

    const lightPalette = lightTheme.palette;
    const darkPalette = darkTheme.palette;

    return (
        <Stack spacing={5}>
            <TitleL>Color Palette</TitleL>

            {/* 라이트 모드 팔레트 섹션 */}
            <Box>
                <Typography variant="h4" gutterBottom>Light Mode</Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={4}>
                    <PaletteSection title="Primary" paletteColor={lightPalette.primary} />
                    <PaletteSection title="Secondary" paletteColor={lightPalette.secondary} />
                    <PaletteSection title="Success" paletteColor={lightPalette.success} />
                    <PaletteSection title="Error" paletteColor={lightPalette.error} />
                    <PaletteSection title="Warning" paletteColor={lightPalette.warning} />
                    <PaletteSection title="Info" paletteColor={lightPalette.info} />
                    <SimpleColorSection title="Text" colors={lightPalette.text} />
                    <SimpleColorSection title="Background" colors={lightPalette.background} />
                </Stack>
            </Box>

            {/* 다크 모드 팔레트 섹션 */}
            <Box>
                <Typography variant="h4" gutterBottom>Dark Mode</Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={4}>
                    <PaletteSection title="Primary" paletteColor={darkPalette.primary} />
                    <PaletteSection title="Secondary" paletteColor={darkPalette.secondary} />
                    <PaletteSection title="Success" paletteColor={darkPalette.success} />
                    <PaletteSection title="Error" paletteColor={darkPalette.error} />
                    <PaletteSection title="Warning" paletteColor={darkPalette.warning} />
                    <PaletteSection title="Info" paletteColor={darkPalette.info} />
                    <SimpleColorSection title="Text" colors={darkPalette.text} />
                    <SimpleColorSection title="Background" colors={darkPalette.background} />
                </Stack>
            </Box>
        </Stack>
    );
};

export default ColorPalettePage;