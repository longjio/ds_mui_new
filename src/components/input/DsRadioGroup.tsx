import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export interface DsRadioGroupProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    items: { label: string; value: string }[];
    name?: string;
    row?: boolean;
    disabled?: boolean;
    id?: string;
}

export function DsRadioGroup({
                                 label,
                                 value,
                                 onChange,
                                 items,
                                 name = 'radio-group',
                                 row = false,
                                 disabled = false,
                                 id = 'ds-radio-group',
                             }: DsRadioGroupProps) {

    return (
        <FormControl>
            <FormLabel id={`${id}-label`}>{label}</FormLabel>
            <RadioGroup
                aria-labelledby={`${id}-label`}
                name={name}
                value={value}
                onChange={onChange}
                row={row}
            >
                {items.map((item) => (
                    <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                        disabled={disabled}
                    />
                ))}
            </RadioGroup>
        </FormControl>

    );

}

