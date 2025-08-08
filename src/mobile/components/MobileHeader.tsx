// D:/ds_mui_new/src/mobile/components/MobileHeader.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { TitleS } from '../../components/typography';

interface MobileHeaderProps {
    title: string;
    /** 왼쪽 아이콘 타입을 지정합니다. (기본값: 'home') */
    leftIcon?: 'back' | 'home' | 'none';
    /** 오른쪽 아이콘 타입을 지정합니다. (기본값: 'menu') */
    rightIcon?: 'home' | 'menu' | 'none';
    /** 왼쪽 아이콘 클릭 이벤트를 처리합니다. 'back' 아이콘일 때 기본 동작(navigate(-1))을 덮어씁니다. */
    onLeftIconClick?: () => void;
    /** 오른쪽 아이콘 클릭 이벤트를 처리합니다. (rightIcon이 'menu'일 때 필수) */
    onRightIconClick?: () => void;
}

export default function MobileHeader({
                                         title,
                                         leftIcon = 'home',
                                         rightIcon = 'menu',
                                         onLeftIconClick,
                                         onRightIconClick,
                                     }: MobileHeaderProps) {
    const navigate = useNavigate();

    const handleBack = onLeftIconClick ? onLeftIconClick : () => navigate(-1);
    const handleHome = () => navigate('/m');

    // 왼쪽 액션 아이콘 렌더링
    const renderLeftAction = () => {
        switch (leftIcon) {
            case 'back':
                return (
                    <IconButton edge="start" color="inherit" onClick={handleBack} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                );
            case 'home':
                return (
                    <IconButton edge="start" color="inherit" onClick={handleHome} aria-label="go to home">
                        {/* ★★★ 핵심 수정 사항 ★★★ */}
                        {/* 왼쪽 홈 아이콘에도 크기 조정을 적용합니다. */}
                        <HomeOutlinedIcon sx={{ fontSize: 28 }} />
                    </IconButton>
                );
            case 'none':
            default:
                // 제목을 중앙에 맞추기 위해 빈 공간을 렌더링합니다.
                return <Box sx={{ width: 40, height: 40 }} />;
        }
    };

    // 오른쪽 액션 아이콘 렌더링
    const renderRightAction = () => {
        switch (rightIcon) {
            case 'home':
                return (
                    <IconButton edge="end" color="inherit" onClick={handleHome} aria-label="home">
                        {/* ★★★ 핵심 수정 사항 ★★★ */}
                        {/* 오른쪽 홈 아이콘에도 크기 조정을 적용합니다. */}
                        <HomeOutlinedIcon sx={{ fontSize: 28 }} />
                    </IconButton>
                );
            case 'menu':
                if (!onRightIconClick) {
                    console.warn("MobileHeader: 'onRightIconClick' prop is required when 'rightIcon' is 'menu'.");
                    return <Box sx={{ width: 40, height: 40 }} />;
                }
                return (
                    <IconButton edge="end" color="inherit" onClick={onRightIconClick} aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>
                );
            case 'none':
            default:
                // 제목을 중앙에 맞추기 위해 빈 공간을 렌더링합니다.
                return <Box sx={{ width: 40, height: 40 }} />;
        }
    };

    return (
        <AppBar position="static" elevation={0} color="inherit" sx={{ border: 0, flexShrink: 0 }}>
            <Toolbar sx={{ px: '20px' }}>
                {renderLeftAction()}
                <TitleS component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    {title}
                </TitleS>
                {renderRightAction()}
            </Toolbar>
        </AppBar>
    );
}