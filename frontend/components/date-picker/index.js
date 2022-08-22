import * as React from 'react';
import { Input } from '@chakra-ui/react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { subDays } from 'date-fns';
import { getStorageItem } from '../../util';

export default function BasicDatePicker(props) {
  const [colorMode,setColor] = React.useState("dark")

  const fetchColor = async () => {
    const colorMode = await getStorageItem("chakra-ui-color-mode")
    setColor(colorMode)
  }

  React.useEffect(() => {
    fetchColor()
  },[])

  return (
      <Datetime
      isValidDate={(current) => {
        const yesterday = subDays(new Date(), 1)
        return current.isAfter(yesterday)
      }}
      className={colorMode === 'dark' ? "dark-rdtPicker" : ""}
      timeFormat={false}
        label={props.label}
        value={props.value}
        onChange={(newValue) => {
          props.onChange(props.name,newValue);
        }}
      
        disabled={props.disabled}
        renderInput={(params) => <Input {...params} {...props} />}
      />
  );
}