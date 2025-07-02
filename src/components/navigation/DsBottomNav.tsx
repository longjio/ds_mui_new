import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import InfoIcon from '@mui/icons-material/Info';

// 네비게이션 아이템 목록을 배열로 관리하면 유지보수가 용이합니다.
const navItems = [
    { label: 'Home', value: '/', icon: <HomeIcon /> },
    { label: 'Components', value: '/button', icon: <WidgetsIcon /> },
    { label: 'About', value: '/about', icon: <InfoIcon /> },
];

const DsBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 현재 경로에 맞는 탭의 value를 찾아 상태를 관리합니다.
    const [value, setValue] = useState(location.pathname);

    // URL이 변경될 때마다 BottomNavigation의 활성 탭을 동기화합니다.
    useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        navigate(newValue);
    };

    return (
        // Paper 컴포넌트로 감싸 그림자 효과를 주고, 화면 하단에 고정시킵니다.
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation showLabels value={value} onChange={handleChange}>
                {navItems.map((item) => (
                    <BottomNavigationAction
                        key={item.label}
                        label={item.label}
                        value={item.value}
                        icon={item.icon}
                    />
                ))}
            </BottomNavigation>
        </Paper>
    );
};

export default DsBottomNav;