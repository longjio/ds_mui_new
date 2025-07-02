// src/components/navigation/DsAppBar.tsx
import * as React from 'react';
import AppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button, { ButtonProps } from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export interface DsAppBarProps extends Omit<MuiAppBarProps, 'children' | 'title'> { // <-- Changed this line
    /**
     * The title to display in the AppBar.
     * @default 'News'
     */
    title?: React.ReactNode;
    /**
     * If `true`, the menu icon button will be displayed.
     * @default true
     */
    showMenuButton?: boolean;
    /**
     * Callback fired when the menu icon is clicked.
     */
    onMenuClick?: IconButtonProps['onClick'];
    /**
     * The text for the action button on the right (e.g., Login).
     * If not provided, the button will not be rendered.
     */
    actionButtonText?: string;
    /**
     * Callback fired when the action button is clicked.
     */
    onActionButtonClick?: ButtonProps['onClick'];
    /**
     * Color of the action button.
     * @default 'inherit'
     */
    actionButtonColor?: ButtonProps['color'];
}

export function DsAppBar({
                             title = 'News',
                             showMenuButton = true,
                             onMenuClick,
                             actionButtonText,
                             onActionButtonClick,
                             actionButtonColor = 'inherit',
                             position = 'static', // Default position from MUI demo
                             ...rest
                         }: DsAppBarProps) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position={position} {...rest}>
                <Toolbar>
                    {showMenuButton && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={onMenuClick}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>
                    {actionButtonText && (
                        <Button color={actionButtonColor} onClick={onActionButtonClick}>
                            {actionButtonText}
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}