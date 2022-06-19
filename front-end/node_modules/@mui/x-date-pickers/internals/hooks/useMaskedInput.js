import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useRifm } from 'rifm';
import { useUtils } from './useUtils';
import { maskedDateFormatter, getDisplayDate, checkMaskIsValidForCurrentFormat, getMaskFromCurrentFormat } from '../utils/text-field-helper';
export const useMaskedInput = ({
  acceptRegex = /[\d]/gi,
  disabled,
  disableMaskedInput,
  ignoreInvalidInputs,
  inputFormat,
  inputProps,
  label,
  mask,
  onChange,
  rawValue,
  readOnly,
  rifmFormatter,
  TextFieldProps,
  validationError
}) => {
  const utils = useUtils();
  const formatHelperText = utils.getFormatHelperText(inputFormat);
  const {
    shouldUseMaskedInput,
    maskToUse
  } = React.useMemo(() => {
    // formatting of dates is a quite slow thing, so do not make useless .format calls
    if (disableMaskedInput) {
      return {
        shouldUseMaskedInput: false,
        maskToUse: ''
      };
    }

    const computedMaskToUse = getMaskFromCurrentFormat(mask, inputFormat, acceptRegex, utils);
    return {
      shouldUseMaskedInput: checkMaskIsValidForCurrentFormat(computedMaskToUse, inputFormat, acceptRegex, utils),
      maskToUse: computedMaskToUse
    };
  }, [acceptRegex, disableMaskedInput, inputFormat, mask, utils]);
  const formatter = React.useMemo(() => shouldUseMaskedInput && maskToUse ? maskedDateFormatter(maskToUse, acceptRegex) : st => st, [acceptRegex, maskToUse, shouldUseMaskedInput]); // TODO: Implement with controlled vs uncontrolled `rawValue`

  const parsedValue = rawValue === null ? null : utils.date(rawValue); // Track the value of the input

  const [innerInputValue, setInnerInputValue] = React.useState(parsedValue); // control the input text

  const [innerDisplayedInputValue, setInnerDisplayedInputValue] = React.useState(getDisplayDate(utils, rawValue, inputFormat));
  const isAcceptedValue = rawValue === null || utils.isValid(parsedValue);

  if (isAcceptedValue && !utils.isEqual(innerInputValue, parsedValue)) {
    // When dev set a new valid value, we trust them
    const newDisplayDate = getDisplayDate(utils, rawValue, inputFormat);
    setInnerInputValue(parsedValue);
    setInnerDisplayedInputValue(newDisplayDate);
  }

  const handleChange = text => {
    const finalString = text === '' || text === mask ? '' : text;
    setInnerDisplayedInputValue(finalString);
    const date = finalString === null ? null : utils.parse(finalString, inputFormat);

    if (ignoreInvalidInputs && !utils.isValid(date)) {
      return;
    }

    setInnerInputValue(date);
    onChange(date, finalString || undefined);
  };

  const rifmProps = useRifm({
    value: innerDisplayedInputValue,
    onChange: handleChange,
    format: rifmFormatter || formatter
  });
  const inputStateArgs = shouldUseMaskedInput ? rifmProps : {
    value: innerDisplayedInputValue,
    onChange: event => {
      handleChange(event.currentTarget.value);
    }
  };
  return _extends({
    label,
    disabled,
    error: validationError,
    inputProps: _extends({}, inputStateArgs, {
      disabled,
      placeholder: formatHelperText,
      readOnly,
      type: shouldUseMaskedInput ? 'tel' : 'text'
    }, inputProps)
  }, TextFieldProps);
};