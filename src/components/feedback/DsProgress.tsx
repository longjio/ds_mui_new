import React from 'react';
import { CircularProgress, LinearProgress, Box, Typography, LinearProgressProps, CircularProgressProps } from '@mui/material';

// 'buffer' variant를 지원하기 위해 커스텀 variant 타입을 정의합니다.
type DsProgressVariant = 'circular' | 'linear' | 'buffer';

// DsProgress가 LinearProgress와 CircularProgress의 prop을 모두 받을 수 있도록 타입을 확장합니다.
// 'variant'와 'classes'는 타입 충돌을 피하기 위해 Omit으로 제외합니다.
interface DsProgressProps extends Omit<LinearProgressProps, 'variant' | 'classes'>, Omit<CircularProgressProps, 'variant' | 'classes'> {
    variant?: DsProgressVariant;
    value?: number;
    valueBuffer?: number; // 'buffer' variant를 위해 추가된 prop
    withLabel?: boolean;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
    size?: number;
    thickness?: number;
}

const DsProgress: React.FC<DsProgressProps> = ({
                                                   variant = 'circular',
                                                   value,
                                                   valueBuffer,
                                                   withLabel,
                                                   color,
                                                   size,
                                                   thickness,
                                                   ...rest
                                               }) => {
    const commonProps = {
        color,
        ...rest,
    };

    if (variant === 'linear' || variant === 'buffer') {
        let linearVariant: LinearProgressProps['variant'];
        if (variant === 'buffer') {
            linearVariant = 'buffer';
        } else {
            linearVariant = value !== undefined ? 'determinate' : 'indeterminate';
        }

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <LinearProgress
                    variant={linearVariant}
                    value={value}
                    valueBuffer={valueBuffer}
                    sx={{ flexGrow: 1 }} // LinearProgress가 Box 내에서 전체 너비를 차지하도록 설정
                    {...commonProps}
                />
                {withLabel && value !== undefined && (
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {`${Math.round(value)}%`}
                    </Typography>
                )}
            </Box>
        );
    }

    const circularVariant: CircularProgressProps['variant'] = value !== undefined ? 'determinate' : 'indeterminate';

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant={circularVariant}
                value={value}
                size={size}
                thickness={thickness}
                {...commonProps}
            />
            {withLabel && value !== undefined && (
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" component="div" color="text.secondary">
                        {`${Math.round(value)}%`}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default DsProgress;