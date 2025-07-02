import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    DialogProps as MuiDialogProps,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Define the props for our custom Dialog component
interface DsDialogProps extends Omit<MuiDialogProps, 'open' | 'onClose'> {
    /**
     * If `true`, the dialog is open.
     */
    open: boolean;
    /**
     * Callback fired when the component requests to be closed.
     */
    onClose: () => void;
    /**
     * The title displayed in the dialog.
     */
    title: string;
    /**
     * The actions to display in the dialog. Typically one or more buttons.
     */
    actions?: React.ReactNode;
}

/**
 * A reusable Dialog component built upon MUI's Dialog.
 * It standardizes the layout with a title, a close button, content, and actions.
 */
const DsDialog: React.FC<DsDialogProps> = ({
                                               open,
                                               onClose,
                                               title,
                                               children,
                                               actions,
                                               ...props
                                           }) => {
    return (
        <Dialog
            onClose={onClose}
            open={open}
            fullWidth
            maxWidth="sm"
            {...props}
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <Typography variant="h6" component="div">{title}</Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            {actions && <DialogActions sx={{ p: '16px 24px' }}>{actions}</DialogActions>}
        </Dialog>
    );
};

export default DsDialog;