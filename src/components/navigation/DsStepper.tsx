import React, { useState } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    StepperProps as MuiStepperProps,
} from '@mui/material';

// 각 스텝의 데이터 타입을 정의합니다.
export interface StepItem {
    label: string;
    optional?: boolean;
}

// DsStepper 컴포넌트가 받을 props 타입을 정의합니다.
interface DsStepperProps extends Omit<MuiStepperProps, 'activeStep' | 'children'> {
    /** 각 스텝의 라벨과 옵션 여부를 담은 배열 */
    steps: StepItem[];
    /** 각 스텝에 해당하는 컨텐츠 ReactNode 배열. steps 배열과 길이가 같아야 합니다. */
    stepContents: React.ReactNode[];
}

/**
 * 여러 단계로 구성된 프로세스를 안내하는 재사용 가능한 Stepper 컴포넌트입니다.
 * 스텝 정보와 각 스텝의 컨텐츠를 props로 받아 내부적으로 상태를 관리합니다.
 */
const DsStepper: React.FC<DsStepperProps> = ({ steps, stepContents, ...props }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!steps[activeStep]?.optional) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
        setSkipped(new Set<number>());
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} {...props}>
                {steps.map((step, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: { optional?: React.ReactNode } = {};
                    if (step.optional) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={step.label} {...stepProps}>
                            <StepLabel {...labelProps}>{step.label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {/* 컨텐츠 및 버튼 영역 */}
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {/* 각 스텝에 맞는 컨텐츠를 렌더링합니다. */}
                    <Box sx={{ mt: 2, mb: 1, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                        {stepContents[activeStep]}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {steps[activeStep]?.optional && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
};

export default DsStepper;
