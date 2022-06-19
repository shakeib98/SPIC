import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker(props) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={props.label}
        value={props.value}
        onChange={(newValue) => {
          props.onChange(props.name,newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}