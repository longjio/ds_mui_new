import React, { useState } from 'react';
import { Box, BottomNavigation, BottomNavigationAction, Paper, Typography } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FolderIcon from '@mui/icons-material/Folder';

const BottomNavPage = () => {
    // 현재 선택된 탭의 인덱스(0, 1, 2...)를 관리하는 상태
    const [value, setValue] = useState(0);

    // 선택된 탭에 따라 중앙에 보여줄 텍스트 컨텐츠를 결정하는 함수
    const renderContent = () => {
        switch (value) {
            case 0:
                return "Recent's content is displayed here.";
            case 1:
                return "Favorites' content is displayed here.";
            case 2:
                return "Nearby's content is displayed here.";
            case 3:
                return "Folder's content is displayed here.";
            default:
                return "Select a tab.";
        }
    };

    return (
        <Box sx={{
            // BottomNavigation에 의해 컨텐츠가 가려지지 않도록 하단 패딩을 줍니다.
            // 실제 앱에서는 BottomNavigation의 높이(기본 56px)만큼 주면 됩니다.
            pb: '70px',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography variant="h4" color="text.secondary">
                {renderContent()}
            </Typography>

            {/*
              Paper 컴포넌트로 감싸 그림자(elevation) 효과를 주고,
              sx prop을 이용해 화면 하단에 고정시킵니다.
            */}
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
                    <BottomNavigationAction label="Folder" icon={<FolderIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default BottomNavPage;