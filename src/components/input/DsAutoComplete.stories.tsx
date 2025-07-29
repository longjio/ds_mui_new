// D:/ds_mui_new/src/components/input/DsAutoComplete.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
// ★★★ 핵심 수정 사항 (2/2) ★★★
// DsAutoComplete.tsx가 명명된(named) 내보내기를 사용하므로,
// 중괄호 { }를 사용하여 정확하게 가져옵니다.
import { DsAutoComplete } from './DsAutoComplete';
import TextField from '@mui/material/TextField';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';

// 스토리에서 사용할 옵션 데이터의 타입을 정의합니다.
interface FilmOptionType {
    label: string;
    year: number;
}

// 샘플 데이터를 사용하는 곳(meta 객체)보다 먼저 정의합니다.
const top100Films: FilmOptionType[] = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    { label: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    { label: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { label: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { label: 'One Flew Over the Cuckoo\'s Nest', year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
];


// --- Storybook 메타 데이터 설정 ---
const meta: Meta<typeof DsAutoComplete> = {
    title: 'Input/DsAutoComplete',
    component: DsAutoComplete,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
자동완성(Autocomplete)은 일반적인 텍스트 입력창에 추천 옵션 패널이 더해져 기능이 향상된 컴포넌트입니다.

주로 다음 두 가지 시나리오에서 유용하게 사용됩니다:

- **콤보 박스 (Combo Box):** 사용자가 반드시 정해진 값 목록 안에서만 값을 선택해야 할 때 사용합니다. (예: 지역 선택)
- **자유 입력 (Free Solo):** 사용자가 어떤 값이든 자유롭게 입력할 수 있지만, 추천 검색어처럼 가능한 값들을 미리 제안하여 사용자 편의성을 높일 때 사용합니다.

이 컴포넌트는 'react-select'나 'downshift'와 같은 유명 라이브러리들의 개선된 버전으로 설계되었습니다.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        // options prop에 대한 컨트롤을 UI에서 숨깁니다.
        options: {
            control: false, // 또는 { type: null }
            description: '자동완성 목록에 표시될 데이터 배열입니다.'
        },
        // renderInput 함수도 컨트롤할 필요가 없으므로 숨깁니다.
        renderInput: {
            control: false,
            description: '입력 필드를 렌더링하는 함수입니다.'
        },
        multiple: { control: 'boolean', description: '여러 항목을 선택할 수 있습니다.' },
        disabled: { control: 'boolean', description: '컴포넌트를 비활성화합니다.' },
        freeSolo: { control: 'boolean', description: '목록에 없는 값도 입력할 수 있습니다.' },
        loading: { control: 'boolean', description: '로딩 상태를 표시합니다.' },
    },
    args: {
        // args는 그대로 두어 컴포넌트가 데이터를 받도록 합니다.
        options: top100Films,
        renderInput: (params: AutocompleteRenderInputParams) => (
            <TextField {...params} label="Movie" sx={{ width: 300 }} />
        ),
    },
};

export default meta;

// 스토리 타입 정의
type Story = StoryObj<typeof meta>;

// --- 기본 스토리 ---
export const Default: Story = {
    name: 'Standard Autocomplete',
};

// --- 다중 선택 스토리 ---
export const MultipleValues: Story = {
    name: 'Multiple Value Selection',
    args: {
        multiple: true,
    },
};

// --- 자유 입력 스토리 ---
export const FreeSolo: Story = {
    name: 'Free Solo (Custom Input)',
    args: {
        freeSolo: true,
        options: top100Films.map(option => option.label),
        renderInput: (params: AutocompleteRenderInputParams) => (
            <TextField {...params} label="Type anything..." sx={{ width: 300 }} />
        ),
    },
};

// --- 비활성화 스토리 ---
export const Disabled: Story = {
    name: 'Disabled State',
    args: {
        disabled: true,
    },
};

// --- 그룹화 스토리 ---
export const Grouped: Story = {
    name: 'Grouped Options',
    args: {
        options: [...top100Films].sort((a, b) => a.year - b.year),
        groupBy: (option) => (option as FilmOptionType).year.toString(),
        getOptionLabel: (option) => (option as FilmOptionType).label,
        renderInput: (params: AutocompleteRenderInputParams) => (
            <TextField {...params} label="Grouped by year" sx={{ width: 300 }} />
        ),
    },
};

// --- 로딩 상태 스토리 ---
export const LoadingState: Story = {
    name: 'Loading State',
    args: {
        loading: true,
        options: [],
        renderInput: (params: AutocompleteRenderInputParams) => (
            <TextField {...params} label="Loading movies..." sx={{ width: 300 }} />
        ),
    },
};