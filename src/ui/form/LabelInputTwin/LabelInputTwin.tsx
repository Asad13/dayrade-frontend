import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import type { InputAttributes } from '../../types/form';

export interface LabelInputTwinProps {
  label: string;
  ariaLabel?: string;
  isError?: boolean;
  showErrorMsg?: boolean;
  errorMsg?: string;
  errorMsgClassNames?: string;
  disbaledClassNames?: string;
  wrapperClassNames?: string;
  wrapperStyles?: CSSProperties;
  containerClassNames?: string;
  containerErrorClassNames?: string;
  containerStyles?: CSSProperties;
  inputClassNames?: string;
  inputErrorClassNames?: string;
  inputStyles?: CSSProperties;
  labelClassNames?: string;
  labelErrorClassNames?: string;
  labelStyles?: CSSProperties;
}

export type LabelInputPropsWithAttributes = InputAttributes &
  LabelInputTwinProps;

const LabelInputTwin = forwardRef<
  HTMLInputElement,
  LabelInputPropsWithAttributes
>(
  (
    {
      type,
      name,
      id,
      label,
      ariaLabel = '',
      isError = false,
      value,
      onChange,
      onBlur,
      defaultValue,
      placeholder,
      disabled = false,
      required = true,
      showErrorMsg = false,
      errorMsg = '',
      errorMsgClassNames,
      disbaledClassNames,
      wrapperClassNames,
      wrapperStyles,
      containerClassNames,
      containerErrorClassNames,
      containerStyles,
      inputClassNames,
      inputErrorClassNames,
      inputStyles,
      labelClassNames,
      labelErrorClassNames,
      labelStyles,
    },
    ref,
  ) => {
    const inputAttributes: InputAttributes = {
      type,
      name,
      id: id ?? name,
      disabled,
      required,
    };

    if (value !== undefined && value !== '') {
      inputAttributes.value = value;
    }

    if (onChange !== undefined) {
      inputAttributes.onChange = onChange;
    }

    if (onBlur !== undefined) {
      inputAttributes.onBlur = onBlur;
    }

    if (defaultValue !== undefined && defaultValue !== '') {
      inputAttributes.defaultValue = defaultValue;
    }

    if (
      !inputAttributes.defaultValue &&
      !inputAttributes.value &&
      placeholder !== undefined
    ) {
      inputAttributes.placeholder = placeholder;
    }

    return (
      <div
        className={`${wrapperClassNames !== undefined && wrapperClassNames}`}
        style={wrapperStyles !== undefined ? wrapperStyles : {}}
      >
        <div
          className={`tw-relative tw-w-full ${
            containerClassNames !== undefined && containerClassNames
          } ${disabled && disbaledClassNames} ${
            containerErrorClassNames !== undefined &&
            isError &&
            containerErrorClassNames
          }`}
          style={containerStyles !== undefined ? containerStyles : {}}
          aria-label={ariaLabel ?? ''}
        >
          <label
            htmlFor={name}
            className={`tw-absolute tw-left-0 tw-top-0 tw-inline-flex tw-h-full tw-w-[40%] tw-items-center tw-overflow-hidden tw-border-r tw-pr-[3%] sm:tw-w-[30%] ${
              labelClassNames !== undefined && labelClassNames
            } ${
              labelErrorClassNames !== undefined &&
              isError &&
              labelErrorClassNames
            }`}
            style={labelStyles !== undefined ? labelStyles : {}}
          >
            {label}
          </label>
          <input
            {...inputAttributes}
            ref={ref}
            className={`tw-w-full tw-border tw-pl-[43%] tw-outline-none sm:tw-pl-[33%]  ${
              inputClassNames !== undefined && inputClassNames
            } ${
              inputErrorClassNames !== undefined &&
              isError &&
              inputErrorClassNames
            }`}
            style={inputStyles !== undefined ? inputStyles : {}}
          />
        </div>
        {showErrorMsg && (
          <span
            className={`${
              errorMsgClassNames !== undefined && errorMsgClassNames
            }`}
          >
            {errorMsg}
          </span>
        )}
      </div>
    );
  },
);

export default LabelInputTwin;
