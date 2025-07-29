// D:/ds_mui_new/src/components/button/DsButton.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { fn, expect, userEvent, within } from '@storybook/test';
import { DsButton } from './DsButton';

// ★★★ 핵심 수정 사항 ★★★
// 'satisfies' 키워드를 제거하고 표준적인 타입 지정 방식으로 변경하여
// Storybook의 코드 분석기가 문법을 올바르게 이해하도록 합니다.
const meta: Meta<typeof DsButton> = {
    title: 'Button/DsButton',
    component: DsButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
버튼(Button)은 사용자가 탭 한 번으로 특정 동작을 실행하거나 값을 선택할 수 있게 합니다.

UI 전반에 배치되어 사용자가 수행할 수 있는 작업을 명확하게 알려주는 역할을 하며, 다음과 같은 세 가지 주요 스타일(variant)을 제공합니다:

- **text:** 텍스트 형태로, 가장 기본적인 버튼입니다. (기본값)
- **contained:** 색상으로 채워져 있어 가장 눈에 띄는 버튼입니다.
- **outlined:** 외곽선으로만 이루어진 버튼입니다.
                `,
            },
        },

    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['contained', 'outlined', 'text'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'],
        },
        size: {
            control: 'radio',
            options: ['small', 'medium', 'large'],
        },
        disabled: { control: 'boolean' },
        loading: { control: 'boolean' },
        children: { control: 'text', name: 'Label' },
    },
    args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'contained',
        color: 'primary',
        children: 'Primary Button',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'contained',
        color: 'secondary',
        children: 'Secondary Button',
    },
};

export const Loading: Story = {
    args: {
        variant: 'contained',
        loading: true,
        children: 'Processing...',
    },
};

export const Disabled: Story = {
    args: {
        variant: 'contained',
        disabled: true,
        children: 'Disabled Button',
    },
};