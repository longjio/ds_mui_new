// src/pages/StepperPage.tsx (예제 페이지)

import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import DsStepper, { StepItem } from '../components/navigation/DsStepper';

const StepperPage = () => {
    // 1. Stepper에 표시할 단계 정보 정의
    const steps: StepItem[] = [
        { label: 'Enter your name' },
        { label: 'Choose a password', optional: true },
        { label: 'Confirm details' },
    ];

    // 2. 각 단계에 보여줄 컨텐츠 정의
    const stepContents: React.ReactNode[] = [
        // Step 1 Content
        <Box>
            <Typography>Please enter your full name.</Typography>
            <TextField label="Full Name" variant="outlined" fullWidth margin="normal" />
        </Box>,
        // Step 2 Content
        <Box>
            <Typography>This step is optional. You can set a password now or later.</Typography>
            <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
        </Box>,
        // Step 3 Content
        <Box>
            <Typography>Please review your information before finishing.</Typography>
        </Box>,
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h1" gutterBottom>
                Stepper
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Stepper는 사용자가 여러 단계를 거쳐 작업을 완료하도록 안내합니다.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Horizontal Stepper Example
            </Typography>
            <DsStepper steps={steps} stepContents={stepContents} />

            <Typography variant="h6" gutterBottom sx={{ mt: 6 }}>
                Vertical Stepper Example
            </Typography>
            <DsStepper
                steps={steps}
                stepContents={stepContents}
                orientation="vertical"
            />
        </Box>
    );
};

export default StepperPage;