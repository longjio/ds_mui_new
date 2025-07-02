import React from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Typography,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Switch,
    SpeedDialProps,
} from '@mui/material';
import DsSpeedDial, { SpeedDialActionItem } from '../components/navigation/DsSpeedDial';

// 아이콘 import
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

// SpeedDial에 전달할 액션 데이터 배열 (두 예제에서 공유)
const actions: SpeedDialActionItem[] = [
    { icon: <FileCopyIcon />, name: 'Copy', onClick: () => console.log('Copy clicked') },
    { icon: <SaveIcon />, name: 'Save', onClick: () => console.log('Save clicked') },
    { icon: <PrintIcon />, name: 'Print', onClick: () => console.log('Print clicked') },
    { icon: <ShareIcon />, name: 'Share', onClick: () => console.log('Share clicked') },
];

// Playground 예제를 위한 SpeedDial 스타일.
// direction prop에 따라 위치가 동적으로 결정됩니다.
const StyledSpeedDial = styled(DsSpeedDial)(({ theme }) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
    },
}));

/**
 * SpeedDial의 direction과 hidden 속성을 제어하는 Playground 컴포넌트
 */
function PlaygroundSpeedDial() {
    const [direction, setDirection] =
        React.useState<SpeedDialProps['direction']>('up');
    const [hidden, setHidden] = React.useState(false);

    const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDirection(
            (event.target as HTMLInputElement).value as SpeedDialProps['direction'],
        );
    };

    const handleHiddenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHidden(event.target.checked);
    };

    return (
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
            <FormControlLabel
                control={
                    <Switch checked={hidden} onChange={handleHiddenChange} color="primary" />
                }
                label="Hidden"
            />
            <FormControl component="fieldset" sx={{ mt: 1, display: 'flex' }}>
                <FormLabel component="legend">Direction</FormLabel>
                <RadioGroup
                    aria-label="direction"
                    name="direction"
                    value={direction}
                    onChange={handleDirectionChange}
                    row
                >
                    <FormControlLabel value="up" control={<Radio />} label="Up" />
                    <FormControlLabel value="right" control={<Radio />} label="Right" />
                    <FormControlLabel value="down" control={<Radio />} label="Down" />
                    <FormControlLabel value="left" control={<Radio />} label="Left" />
                </RadioGroup>
            </FormControl>
            <Box sx={{ position: 'relative', mt: 3, height: 320, border: '1px dashed grey' }}>
                <StyledSpeedDial
                    ariaLabel="SpeedDial playground example"
                    hidden={hidden}
                    direction={direction}
                    actions={actions}
                />
            </Box>
        </Box>
    );
}


const SpeedDialPage = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h1" gutterBottom>
                Speed Dial
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Speed Dial은 사용자가 마우스를 올리거나 클릭하면 여러 액션 버튼을 표시하는 플로팅 버튼입니다.
            </Typography>

            {/* --- 예제 1: 기본 Speed Dial --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Basic Speed Dial
            </Typography>
            <Typography color="text.secondary">
                이 컴포넌트는 컨테이너의 우측 하단에 고정됩니다.
                컨테이너는 `position: 'relative'` 속성을 가져야 합니다.
            </Typography>

            {/* SpeedDial을 담을 컨테이너 Box */}
            <Box sx={{ height: 320, position: 'relative', border: '1px dashed grey', mt: 2 }}>
                <DsSpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    actions={actions}
                />
            </Box>

            {/* --- 예제 2: Playground Speed Dial --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 6 }}>
                Playground Speed Dial
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
                방향과 숨김 여부를 제어할 수 있는 Speed Dial 예제입니다.
            </Typography>
            <PlaygroundSpeedDial />
        </Box>
    );
};

export default SpeedDialPage;