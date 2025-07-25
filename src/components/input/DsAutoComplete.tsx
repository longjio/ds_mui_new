// DsAutoComplete.tsx
import * as React from 'react';
import MuiAutocomplete, { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete';

/**
 * DsAutoComplete 컴포넌트의 Props 인터페이스입니다.
 * MUI Autocomplete의 모든 속성을 확장합니다.
 */
export interface DsAutoCompleteProps<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
> extends MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
    // 향후 커스텀 props 추가 영역
}

// ★★★ 핵심 수정 사항 (1/2) ★★★
// 'export default' 대신 'export const'를 사용하여 명명된(named) 내보내기를 합니다.
// 이 방식은 Storybook과 같은 도구가 모듈을 더 안정적으로 분석하게 해줍니다.
export const DsAutoComplete = <
    T,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined,
>(
    props: DsAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>,
): React.ReactElement => {
    return (
        <MuiAutocomplete<T, Multiple, DisableClearable, FreeSolo>
            {...props}
        />
    );
};

// 파일 맨 아래에 'export default DsAutoComplete;' 라인이 있었다면 제거합니다.