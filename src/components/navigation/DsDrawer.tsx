import React from 'react';
import { Drawer, DrawerProps as MuiDrawerProps, Box } from '@mui/material';

// DsDrawer 컴포넌트가 받을 props 타입을 정의합니다.
// MUI의 DrawerProps를 확장하여 모든 기본 기능을 지원합니다.
interface DsDrawerProps extends Omit<MuiDrawerProps, 'onClose'> {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
    children: React.ReactNode;
    // Drawer의 너비를 prop으로 받아 조절할 수 있도록 추가합니다.
    width?: number | string;
}

const DsDrawer: React.FC<DsDrawerProps> = ({
                                               open,
                                               onClose,
                                               children,
                                               anchor = 'left', // 기본 열림 방향을 'left'로 설정
                                               width,
                                               ...otherProps // 나머지 모든 MUI Drawer props
                                           }) => {
    // Drawer의 너비를 동적으로 설정합니다.
    // 너비 prop이 주어지지 않으면 기본 너비(250px)를 사용합니다.
    const drawerWidth = (anchor === 'left' || anchor === 'right') ? (width || 250) : 'auto';

    return (
        <Drawer
            anchor={anchor}
            open={open}
            onClose={onClose}
            {...otherProps}
        >
            <Box
                sx={{ width: drawerWidth }}
                role="presentation"
                // 컨텐츠 클릭 시 Drawer가 닫히도록 하려면 아래 두 줄을 활성화합니다.
                // onClick={onClose}
                // onKeyDown={onClose}
            >
                {children}
            </Box>
        </Drawer>
    );
};

export default DsDrawer;