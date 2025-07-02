// src/pages/ToggleButtonPage.tsx
import React, { useState } from 'react';
import { Stack, Typography, Paper, Divider } from '@mui/material'; // Removed unused Box import
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import DsToggleButton from '../components/input/DsToggleButton'; // Ensure this path is correct

const ToggleButtonPage = () => {
    // 단일 선택 (Exclusive) 예제 상태
    const [alignment, setAlignment] = useState<string | null>('left');

    const handleAlignment = (
        _event: React.MouseEvent<HTMLElement>, // Prefix with _ if event is not used
        newValue: string | string[] | null,    // Match DsToggleButton's onChange prop type
    ) => {
        // This handler is for an exclusive ToggleButtonGroup.
        // newValue is expected to be string | null.
        const newAlignmentValue = newValue as string | null; // Safe to cast based on usage context

        // Original logic: only update if not null.
        // If you want to allow the state to become null (e.g., if user deselects the button):
        // setAlignment(newAlignmentValue);
        if (newAlignmentValue !== null) {
            setAlignment(newAlignmentValue);
        }
    };

    const alignmentOptions = [
        { value: 'left', icon: <FormatAlignLeftIcon />, ariaLabel: 'left aligned' },
        { value: 'center', icon: <FormatAlignCenterIcon />, ariaLabel: 'center aligned' },
        { value: 'right', icon: <FormatAlignRightIcon />, ariaLabel: 'right aligned' },
    ];

    // 다중 선택 예제 상태
    const [formats, setFormats] = useState<string[]>(() => ['bold', 'italic']);

    const handleFormat = (
        _event: React.MouseEvent<HTMLElement>, // Prefix with _ if event is not used
        newValue: string | string[] | null,    // Match DsToggleButton's onChange prop type
    ) => {
        // This handler is for a non-exclusive ToggleButtonGroup.
        // newValue is expected to be string[].
        // MUI's non-exclusive ToggleButtonGroup returns string[] (even an empty one).
        if (Array.isArray(newValue)) {
            setFormats(newValue);
        } else {
            // This case (e.g., newValue is null or a string) would be unexpected
            // for a non-exclusive group if DsToggleButton passes MUI's value directly.
            // If null means "no selection", an empty array is appropriate for the state.
            setFormats([]);
            if (newValue !== null) { // Log if it was a string, which is definitely an issue
                console.warn('handleFormat received a non-array, non-null value for a multi-select toggle group:', newValue);
            }
        }
    };

    const formatOptions = [
        { value: 'bold', icon: <FormatBoldIcon />, ariaLabel: 'bold' },
        { value: 'italic', icon: <FormatItalicIcon />, ariaLabel: 'italic' },
        { value: 'underlined', icon: <FormatUnderlinedIcon />, ariaLabel: 'underline' },
    ];

    // 텍스트와 아이콘 함께 사용 예제 상태
    const [view, setView] = useState<string | null>('list');

    const handleView = (
        _event: React.MouseEvent<HTMLElement>, // Prefix with _ if event is not used
        newValue: string | string[] | null,    // Match DsToggleButton's onChange prop type
    ) => {
        // This handler is for an exclusive ToggleButtonGroup.
        // newValue is expected to be string | null.
        const newViewValue = newValue as string | null; // Safe to cast

        // Original logic: only update if not null.
        if (newViewValue !== null) {
            setView(newViewValue);
        }
        // If you want to allow the state to become null:
        // setView(newViewValue);
    };

    const viewOptions = [
        { value: 'list', label: 'List', icon: <FormatAlignLeftIcon />, ariaLabel: 'list view' },
        { value: 'module', label: 'Module', icon: <FormatAlignCenterIcon />, ariaLabel: 'module view' },
    ];


    return (
        <Stack spacing={4} sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                DsToggleButton 예제
            </Typography>

            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    단일 선택 (Exclusive)
                </Typography>
                <DsToggleButton
                    options={alignmentOptions}
                    value={alignment}
                    onChange={handleAlignment}
                    exclusive
                    aria-label="text alignment"
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    선택된 정렬: {alignment || '없음'}
                </Typography>
            </Paper>

            <Divider />

            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    다중 선택
                </Typography>
                <DsToggleButton
                    options={formatOptions}
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting"
                    color="primary" // 색상 예시
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    선택된 포맷: {formats.join(', ') || '없음'}
                </Typography>
            </Paper>

            <Divider />

            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    아이콘과 텍스트 함께 사용 (단일 선택)
                </Typography>
                <DsToggleButton
                    options={viewOptions}
                    value={view}
                    onChange={handleView}
                    exclusive
                    size="small" // 사이즈 예시
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    선택된 뷰: {view || '없음'}
                </Typography>
            </Paper>

            <Divider />

            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    버튼 스타일 커스텀 (buttonSx)
                </Typography>
                <DsToggleButton
                    options={alignmentOptions} // Re-using alignmentOptions and handleAlignment
                    value={alignment}
                    onChange={handleAlignment} // handleAlignment is now correctly typed
                    exclusive
                    buttonSx={{
                        '&.Mui-selected': {
                            backgroundColor: 'secondary.main',
                            color: 'secondary.contrastText',
                            '&:hover': {
                                backgroundColor: 'secondary.dark',
                            }
                        },
                        borderTopRightRadius: 20, // 예시 스타일
                        borderBottomLeftRadius: 20,
                    }}
                />
            </Paper>

        </Stack>
    );
};

export default ToggleButtonPage;