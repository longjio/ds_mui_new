import React from 'react';
import { Button, Box } from '@mui/material';
import { useThemeContext } from '../../contexts/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const ThemeModeButtonGroup = () => {
    const { mode, setMode } = useThemeContext();

    return (
        <Box sx={{ display: 'flex' }}>
            <Button
                onClick={() => setMode('light')}
                variant="outlined"
                color="inherit"
                size="small"
                startIcon={<LightModeIcon />}
                sx={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    ...(mode === 'light'
                        ? {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        }
                        : {
                            borderColor: '#5E6774',
                        }),
                }}
            >
                Light
            </Button>
            <Button
                onClick={() => setMode('dark')}
                variant="outlined"
                color="inherit"
                size="small"
                startIcon={<DarkModeIcon />}
                sx={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    ...(mode === 'dark'
                        ? {
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        }
                        : {
                            borderColor: '#5E6774',
                        }),
                }}
            >
                Dark
            </Button>
        </Box>
    );
};