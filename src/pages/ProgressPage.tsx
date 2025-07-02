import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import DsProgress from '../components/feedback/DsProgress';

// 원형 프로그레스 예제
const CircularProgressExample = () => (
    <>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Circular Progress
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
            <DsProgress />
            <DsProgress color="secondary" />
            <DsProgress color="success" />
            <DsProgress color="error" />
        </Stack>
    </>
);

// 확정적 원형 프로그레스 예제
const CircularDeterminateExample = ({ progress }: { progress: number }) => (
    <>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Circular Determinate
        </Typography>
        <Stack spacing={2} direction="row">
            <DsProgress variant="circular" value={progress} />
            <DsProgress variant="circular" withLabel value={progress} color="success" />
        </Stack>
    </>
);

// 선형 프로그레스 예제
const LinearProgressExample = () => (
    <>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Linear Progress
        </Typography>
        <Stack spacing={2} sx={{ width: '100%' }}>
            <DsProgress variant="linear" />
        </Stack>
    </>
);

// 확정적 선형 프로그레스 예제
const LinearDeterminateExample = ({ progress }: { progress: number }) => (
    <>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Linear Determinate
        </Typography>
        <Stack spacing={2} sx={{ width: '100%' }}>
            <DsProgress variant="linear" value={progress} />
            <DsProgress variant="linear" withLabel value={progress} color="success" />
        </Stack>
    </>
);

// --- 신규 추가: 선형 버퍼 프로그레스 예제 ---
const LinearBufferExample = () => {
    const [progress, setProgress] = useState(0);
    const [buffer, setBuffer] = useState(10);

    // setInterval 내에서 최신 state를 참조하기 위해 ref를 사용하는 패턴
    const progressRef = useRef(() => {});
    useEffect(() => {
        progressRef.current = () => {
            if (progress >= 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const newProgress = progress + 1;
                setProgress(newProgress);

                // 버퍼 값을 불규칙하게 증가시켜 실제 버퍼링처럼 보이게 함
                if (newProgress % 5 === 0 && buffer < 100) {
                    const newBuffer = buffer + 1 + Math.random() * 10;
                    setBuffer(newBuffer > 100 ? 100 : newBuffer);
                }
            }
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 100); // 0.1초마다 업데이트

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Linear Buffer
            </Typography>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <DsProgress variant="buffer" value={progress} valueBuffer={buffer} />
            </Stack>
        </>
    );
};

// 커스텀 크기 및 두께 예제
const CustomSizeExample = () => (
    <>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Custom Size & Thickness
        </Typography>
        <Stack spacing={2} direction="row" alignItems="center">
            <DsProgress size={60} />
            <DsProgress size={80} thickness={5} color="secondary" />
            <DsProgress variant="circular" withLabel value={75} size={100} thickness={2} />
        </Stack>
    </>
);

const ProgressPage = () => {
    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 10 : prev + 10));
        }, 800);
        return () => clearInterval(timer);
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h1" gutterBottom>
                Progress
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Progress indicator(진행 표시기)는 지정되지 않은 대기 시간을 알리거나 작업의 진행률을 표시합니다.
            </Typography>
            <CircularProgressExample />
            <CircularDeterminateExample progress={progress} />
            <LinearProgressExample />
            <LinearDeterminateExample progress={progress} />
            <LinearBufferExample /> {/* 새로 추가된 예제를 여기에 배치 */}
            <CustomSizeExample />
        </Box>
    );
};

export default ProgressPage;