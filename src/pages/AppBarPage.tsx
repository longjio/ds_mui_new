// src/pages/AppBarPage.tsx

import React, { useState } from 'react'; // useState 추가
import {
    Box,
    Typography,
    Container,
    Paper,
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Menu, // Menu 추가
    MenuItem // MenuItem 추가
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle'; // AccountCircle 아이콘 추가
import { DsAppBar } from '../components/surface/DsAppBar';

// --- SearchAppBar를 위한 스타일 컴포넌트 정의 (기존 코드 유지) ---
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
// --- 스타일 컴포넌트 정의 끝 ---

const AppBarPage = () => {
    // 기존 핸들러들
    const handleMenuClick = () => {
        alert('메뉴 아이콘 클릭됨!');
    };

    const handleLoginClick = () => {
        alert('로그인 버튼 클릭됨!');
    };

    // const handleCustomActionClick = () => { // 이 핸들러는 아래 예제에서 사용되지 않으므로 주석 처리 또는 삭제 가능
    //     alert('사용자 정의 액션 버튼 클릭됨!');
    // };

    const handleSearchAppBarMenuClick = () => {
        alert('검색 AppBar 메뉴 아이콘 클릭됨!');
    };

    // --- 프로필 메뉴를 위한 상태 및 핸들러 ---
    const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(null);
    const openProfileMenu = Boolean(anchorElProfile);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorElProfile(null);
        // 각 메뉴 아이템 클릭 시 추가 동작 구현 가능
    };

    const handleProfileMenuItemClick = (action: string) => {
        alert(`${action} 클릭됨!`);
        handleProfileMenuClose();
    };
    // --- 프로필 메뉴 로직 끝 ---

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column',  width: '100%', minHeight: '100vh' }}>
            <Typography variant="h1" component="h1" gutterBottom>
                App Bar
            </Typography>
            {/* 페이지 내용 */}
            <Container maxWidth="xl" component="main" sx={{ mt: 4, mb: 2, flexGrow: 1 }}>
                {/* 예시 1: 기본 DsAppBar (기존 코드 유지) */}
                <DsAppBar
                    title="기본 AppBar"
                    onMenuClick={handleMenuClick}
                    actionButtonText="로그인"
                    onActionButtonClick={handleLoginClick}
                />
                {/* 예시 2, 3 (기존 코드 유지) ... */}
                <Box sx={{ mt: 5 }}>
                    <DsAppBar
                        title="메뉴 버튼 없는 AppBar"
                        showMenuButton={false}
                        actionButtonText="정보"
                        onActionButtonClick={() => alert('정보 버튼 클릭!')}
                    />
                    {/* ... Paper 설명 ... */}
                </Box>

                <Box sx={{ mt: 5 }}>
                    <DsAppBar
                        title="간단한 제목 표시줄"
                        onMenuClick={handleMenuClick}
                    />
                    {/* ... Paper 설명 ... */}
                </Box>


                {/* 예시 4: 프로필 메뉴가 있는 AppBar (MUI 데모 기반으로 수정) */}
                <Box sx={{ mt: 5 }}>
                    {/* 이 부분은 MUI AppBar를 직접 사용하여 구성합니다. */}
                    <AppBar position="sticky"> {/* DsAppBar 대신 MUI AppBar 직접 사용 */}
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={handleMenuClick} // 일반 메뉴 핸들러 연결
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <span role="img" aria-label="star" style={{ marginRight: '8px' }}>⭐</span>
                                    특별한 제목
                                </Box>
                            </Typography>
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar-profile"
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar-profile"
                                    anchorEl={anchorElProfile}
                                    anchorOrigin={{
                                        vertical: 'bottom', // 아이콘 아래에 표시되도록 조정
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={openProfileMenu}
                                    onClose={handleProfileMenuClose}
                                >
                                    <MenuItem onClick={() => handleProfileMenuItemClick('Profile')}>Profile</MenuItem>
                                    <MenuItem onClick={() => handleProfileMenuItemClick('My account')}>My account</MenuItem>
                                    <MenuItem onClick={() => handleProfileMenuItemClick('Logout')}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Paper sx={{ p: 2, mt: 2, height: '150px', overflowY: 'auto' }}>
                        <Typography>
                            이 AppBar는 MUI의 <code>AppBar</code>를 직접 사용하여 프로필 아이콘 클릭 시 메뉴가
                            나타나는 기능을 구현했습니다. <code>position="sticky"</code>로 설정되어 스크롤 시
                            상단에 고정됩니다.
                        </Typography>
                        <Typography>스크롤을 위한 컨텐츠</Typography>
                    </Paper>
                </Box>

                {/* 예시 5: 검색창이 있는 AppBar (기존 코드 유지) ... */}
                <Box sx={{ mt: 5 }}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                                onClick={handleSearchAppBarMenuClick}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                검색 AppBar
                            </Typography>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="검색…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Toolbar>
                    </AppBar>
                    {/* ... Paper 설명 ... */}
                </Box>

            </Container>

            {/* 푸터 (기존 코드 유지) ... */}
        </Box>
    );
};

export default AppBarPage;