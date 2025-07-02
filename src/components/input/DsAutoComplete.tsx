// DsAutoComplete.tsx
import * as React from 'react';
import MuiAutocomplete, { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete';

/**
 * DsAutoComplete 컴포넌트의 Props 인터페이스입니다.
 * MUI Autocomplete의 모든 속성을 확장합니다.
 *
 * 제네릭 타입:
 * @template T 옵션의 타입입니다.
 * @template Multiple 다중 값 허용 여부입니다.
 * @template DisableClearable 지우기 버튼 비활성화 여부입니다.
 * @template FreeSolo 자유 입력 모드 활성화 여부입니다.
 */
export interface DsAutoCompleteProps<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
> extends MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
    // 향후 디자인 시스템의 Autocomplete에 특화된 커스텀 props를 여기에 추가할 수 있습니다.
    // 예시:
    // dsVariant?: 'standard' | 'compact';
}

/**
 * DsAutoComplete는 MUI Autocomplete를 감싸는 커스텀 Autocomplete 컴포넌트입니다.
 * 디자인 시스템의 기본 구성 요소로 설계되었습니다.
 * 표준 MUI Autocomplete가 허용하는 모든 props를 허용합니다.
 *
 * 제네릭 타입:
 * @template T 옵션의 타입입니다.
 * @template Multiple 다중 값 허용 여부입니다.
 * @template DisableClearable 지우기 버튼 비활성화 여부입니다.
 * @template FreeSolo 자유 입력 모드 활성화 여부입니다.
 */
const DsAutoComplete = <
    T,
    Multiple extends boolean | undefined = undefined, // 컴포넌트로 쉽게 사용하기 위해 제네릭 기본값 설정
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined,
>(
    props: DsAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>,
): React.ReactElement => {
    // 기본 래퍼의 경우 모든 props를 MUI Autocomplete로 그대로 전달합니다.
    // 만약 DsAutoCompleteProps에 커스텀 props를 정의했다면,
    // 여기서 해당 props를 구조 분해하여 처리한 후 나머지를 MuiAutocomplete로 전달합니다.
    // 예시: const { dsVariant, ...otherMuiProps } = props;

    return (
        <MuiAutocomplete<T, Multiple, DisableClearable, FreeSolo>
            {...props} // 모든 props를 직접 전달
        />
    );
};

export default DsAutoComplete;