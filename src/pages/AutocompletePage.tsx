import TextField from '@mui/material/TextField';
import DsAutoComplete from '../components/input/DsAutoComplete'; // DsAutoComplete.tsx 파일 경로
import React from 'react'; // React import 추가
import { Box, Typography, Chip } from '@mui/material'; // Box, Typography, Chip for layout and tags

// --- CustomizedHook Autocomplete Example Imports ---
import useAutocomplete from '@mui/material/useAutocomplete'; // AutocompleteGetTagProps는 Chip 사용 시 직접 필요 X
import CheckIcon from '@mui/icons-material/Check';
import {BodyS} from "../components/typography"; // Listbox 아이템 선택 표시에 사용 가능
// CloseIcon은 Chip의 onDelete에서 자동으로 처리될 수 있음

// styled와 autocompleteClasses는 커스텀 스타일링에 사용되었으므로 제거 가능
// import { styled } from '@mui/material/styles';
// import { autocompleteClasses } from '@mui/material/Autocomplete';

// --- FilmOption interface (used by both examples) ---
interface FilmOptionType {
    title: string;
    year: number;
}

// --- Data for the first example ---
const topFilmsSimple: readonly FilmOptionType[] = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
];

// --- Data for CustomizedHook Example (축소됨) ---
const top100Films: readonly FilmOptionType[] = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003, },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980, },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
];


// --- CustomizedHook Autocomplete Component (기본 스타일로 변경) ---
function CustomizedHookAutocomplete() {
    const {
        getRootProps,
        // getInputLabelProps, // TextField의 label prop으로 대체
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        // focused, // TextField가 자체적으로 포커스 스타일 관리
        // setAnchorEl, // TextField가 Listbox 위치 관리 또는 Popper 사용 시 필요
    } = useAutocomplete({
        id: 'customized-hook-simplified-demo', // ID 변경
        defaultValue: [top100Films[1]],
        multiple: true,
        options: top100Films,
        getOptionLabel: (option) => option.title,
        isOptionEqualToValue: (option, val) => option.title === val.title && option.year === val.year,
        // freeSolo: true, // 필요에 따라 자유 입력 허용
    });

    // TextField에 전달할 getInputProps에서 color 및 size 속성 제외
    const { color, size, ...otherInputProps } = getInputProps();

    return (
        <Box sx={{ width: 300, position: 'relative' }}> {/* Listbox를 위해 position: 'relative' 추가 */}
            {/*
                useAutocomplete 훅을 사용하면서 MUI TextField와 Chip으로 UI를 구성하는 것은
                사실상 MUI Autocomplete 컴포넌트의 내부 동작을 일부 수동으로 구현하는 것과 유사해집니다.
                가장 "기본 스타일"을 원한다면, DsAutoComplete (내부적으로 MUI Autocomplete 사용)를
                활용하는 것이 더 간단하고 권장되는 방식입니다.

                아래 코드는 useAutocomplete 훅의 각 prop getter를 MUI 기본 컴포넌트에
                어떻게 연결할 수 있는지 보여주는 예시입니다.
            */}
            <div {...getRootProps()}>
                {/* Label은 TextField의 label prop으로 대체 */}
                <TextField
                    fullWidth // Box 너비에 맞춤
                    label="Customized Hook (Simplified)" // getInputLabelProps() 대신 직접 설정
                    {...otherInputProps} // color 및 size가 제외된 input props 전달
                    InputProps={{ // TextField의 InputProps를 통해 태그 렌더링 및 ref 설정
                        // ref: setAnchorEl, // Autocomplete가 Listbox 위치를 관리하도록 ref 연결 (Popper 사용 시)
                        startAdornment: (
                            // Chip들을 감싸는 Box에 flexWrap 적용
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 /* theme.spacing(0.5) -> 4px */ }}>
                                {value.map((option: FilmOptionType, index: number) => {
                                    // getTagProps는 이미 key를 포함하므로, 여기서 key를 직접 지정하지 않습니다.
                                    const tagPropsFromHook = getTagProps({ index });
                                    return (
                                        <Chip
                                            {...tagPropsFromHook} // getTagProps에서 반환된 props (key 포함) 사용
                                            label={option.title}
                                            // onDelete는 tagPropsFromHook에 포함되어 있음
                                            size="small" // Chip 자체의 size prop
                                            // style={{ margin: '2px' }} // gap으로 대체하여 삭제 또는 주석 처리
                                            onClick={() => {
                                                // Chip 몸통 클릭 시 오류 방지용 빈 핸들러 추가
                                                // console.log('Chip clicked:', option.title); // 디버깅용
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                        ),
                    }}
                />
            </div>
            {groupedOptions.length > 0 ? (
                <Box component="ul" {...getListboxProps()} sx={{
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                    position: 'absolute', // 간단한 위치 조정 (실제로는 Popper 등 필요)
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    maxHeight: 200,
                    overflow: 'auto',
                    zIndex: 1300, // 다른 요소 위에 오도록 zIndex 설정
                    width: '100%', // 부모 Box 너비에 맞춤
                }}>
                    {(groupedOptions as FilmOptionType[]).map((option, index) => {
                        // getOptionProps는 이미 key를 포함합니다.
                        const optionPropsFromHook = getOptionProps({ option, index });
                        return (
                            <Box component="li" {...optionPropsFromHook} sx={{ p: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <Typography variant="body2" component="span" sx={{ flexGrow: 1 }}>
                                    {option.title}
                                </Typography>
                                {/* 현재 선택된 값(value)과 현재 옵션(option)을 비교하여 CheckIcon 표시 */}
                                {value.some(v => v.title === option.title && v.year === option.year) && (
                                    <CheckIcon fontSize="small" sx={{ ml: 1, color: 'primary.main' }} />
                                )}
                            </Box>
                        );
                    })}
                </Box>
            ) : null}
        </Box>
    );
}


// --- Main Page Component ---
function AutocompletePage() {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h1" component="h1" gutterBottom>
                Autocomplete
            </Typography>
            <BodyS>Body S Pretendard Regular 14</BodyS>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    DsAutoComplete (Basic Wrapper)
                </Typography>
                <DsAutoComplete<FilmOptionType, false, false, false>
                    options={topFilmsSimple}
                    getOptionLabel={(option) => option.title}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="영화 선택 (DsAutoComplete)" />}
                />
            </Box>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    Customized Hook Autocomplete (Simplified)
                </Typography>
                <CustomizedHookAutocomplete />
            </Box>
        </Box>
    );
}

export default AutocompletePage;