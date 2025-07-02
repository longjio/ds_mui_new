// src/pages/CheckboxPage.tsx
import * as React from 'react';
import DsCheckbox from '../components/input/DsCheckbox'; // DsCheckbox 컴포넌트 경로
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// Indeterminate Checkbox 예제를 위해 추가된 import
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// FormGroup 예제를 위해 추가된 import
import FormGroup from '@mui/material/FormGroup';

export default function CheckboxPage() {
    // --- 기본 예제 상태 ---
    const [isChecked1, setIsChecked1] = React.useState<boolean>(false);
    const [isChecked2, setIsChecked2] = React.useState<boolean>(true);

    // --- Indeterminate Checkbox 예제 상태 ---
    const [indeterminateChecked, setIndeterminateChecked] = React.useState([true, false]);

    // --- FormGroup 예제 상태 분리 ---
    // 가로 FormGroup을 위한 상태
    const [horizontalState, setHorizontalState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });
    // 세로 FormGroup을 위한 상태
    const [verticalState, setVerticalState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });


    // --- 핸들러 함수들 ---
    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIsChecked1(checked);
    };

    const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndeterminateChecked([event.target.checked, event.target.checked]);
    };

    const handleChild1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndeterminateChecked([event.target.checked, indeterminateChecked[1]]);
    };

    const handleChild2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndeterminateChecked([indeterminateChecked[0], event.target.checked]);
    };

    // 가로 FormGroup을 위한 핸들러
    const handleHorizontalChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setHorizontalState({
            ...horizontalState,
            [event.target.name]: checked,
        });
    };

    // 세로 FormGroup을 위한 핸들러
    const handleVerticalChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setVerticalState({
            ...verticalState,
            [event.target.name]: checked,
        });
    };


    // --- 렌더링을 위한 JSX 변수 ---
    const indeterminateChildren = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="Child 1"
                control={<Checkbox checked={indeterminateChecked[0]} onChange={handleChild1Change} />}
            />
            <FormControlLabel
                label="Child 2"
                control={<Checkbox checked={indeterminateChecked[1]} onChange={handleChild2Change} />}
            />
        </Box>
    );

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h1" component="h1" gutterBottom>
                Checkbox
            </Typography>

            {/* --- 기본 예제 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Basic Checkbox
            </Typography>
            <DsCheckbox
                label="동의합니다 (Option 1)"
                checked={isChecked1}
                onChange={handleChange1}
                id="checkbox-option-1"
                name="agreement"
            />

            {/* --- 비활성화 예제 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Disabled Checkbox
            </Typography>
            <DsCheckbox
                label="이메일 수신 동의 (Option 2 - Disabled)"
                checked={isChecked2}
                onChange={(e, checked) => setIsChecked2(checked)}
                disabled={true}
                id="checkbox-option-2"
            />

            {/* --- 라벨 없는 예제 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Checkbox without Label
            </Typography>
            <DsCheckbox
                checked={false}
                onChange={(e, checked) => console.log('No label state:', checked)}
                id="checkbox-option-3"
                aria-label="Standalone checkbox"
            />

            {/* --- 작은 크기 예제 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Small Size Checkbox
            </Typography>
            <DsCheckbox
                label="작은 크기 (Small Size)"
                checked={true}
                onChange={(e, checked) => console.log('Small size state:', checked)}
                id="checkbox-option-4"
                size="small"
            />

            {/* --- Indeterminate 예제 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Indeterminate Checkbox
            </Typography>
            <div>
                <FormControlLabel
                    label="Parent"
                    control={
                        <Checkbox
                            checked={indeterminateChecked[0] && indeterminateChecked[1]}
                            indeterminate={indeterminateChecked[0] !== indeterminateChecked[1]}
                            onChange={handleParentChange}
                        />
                    }
                />
                {indeterminateChildren}
            </div>

            {/* --- 가로 FormGroup 예제 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Horizontal FormGroup
            </Typography>
            <FormGroup row>
                <DsCheckbox
                    label="Gilad"
                    checked={horizontalState.gilad}
                    onChange={handleHorizontalChange}
                    name="gilad"
                />
                <DsCheckbox
                    label="Jason"
                    checked={horizontalState.jason}
                    onChange={handleHorizontalChange}
                    name="jason"
                />
                <DsCheckbox
                    label="Antoine"
                    checked={horizontalState.antoine}
                    onChange={handleHorizontalChange}
                    name="antoine"
                />
            </FormGroup>

            {/* --- 세로 FormGroup 예제 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Vertical FormGroup
            </Typography>
            <FormGroup>
                <DsCheckbox
                    label="Gilad"
                    checked={verticalState.gilad}
                    onChange={handleVerticalChange}
                    name="gilad"
                />
                <DsCheckbox
                    label="Jason"
                    checked={verticalState.jason}
                    onChange={handleVerticalChange}
                    name="jason"
                />
                <DsCheckbox
                    label="Antoine"
                    checked={verticalState.antoine}
                    onChange={handleVerticalChange}
                    name="antoine"
                />
            </FormGroup>
        </Box>
    );
}