import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import type { InputAttributes } from '../../types/form';

export interface InputProps {
  ariaLabel?: string;
  isError?: boolean;
  showErrorMsg?: boolean;
  errorMsg?: string;
  errorMsgClassNames?: string;
  disbaledClassNames?: string;
  wrapperClassNames?: string;
  wrapperStyles?: CSSProperties;
  containerClassNames?: string;
  containerStyles?: CSSProperties;
  classNames?: string;
  errorClassNames?: string;
  styles?: CSSProperties;
}

export type InputPropsWithAttributes = InputAttributes & InputProps;

const Input = forwardRef<HTMLInputElement, InputPropsWithAttributes>(
  (
    {
      type,
      name,
      id,
      ariaLabel = '',
      value,
      onChange,
      onBlur,
      defaultValue,
      placeholder,
      disabled = false,
      required = true,
      isError = false,
      showErrorMsg = false,
      errorMsgClassNames,
      errorMsg = '',
      disbaledClassNames,
      wrapperClassNames,
      wrapperStyles,
      containerClassNames,
      containerStyles,
      classNames,
      errorClassNames,
      styles,
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
        className={`tw-w-full ${
          wrapperClassNames !== undefined && wrapperClassNames
        }`}
        style={wrapperStyles !== undefined ? wrapperStyles : {}}
      >
        <div
          className={`tw-w-full ${
            containerClassNames !== undefined && containerClassNames
          }`}
          style={containerStyles !== undefined ? containerStyles : {}}
        >
          <input
            ref={ref}
            aria-label={ariaLabel}
            {...inputAttributes}
            className={`tw-w-full tw-border tw-outline-none ${
              classNames !== undefined && classNames
            } ${errorClassNames !== undefined && isError && errorClassNames} ${
              disabled && disbaledClassNames
            }`}
            style={styles !== undefined ? styles : {}}
          />
        </div>
        {showErrorMsg && (
          <span
            className={`tw-mt-1 tw-block tw-h-[22px] tw-w-full tw-overflow-x-hidden tw-text-[10px] tw-leading-[11px] tw-text-error-dark sm:tw-h-[28px] sm:tw-text-xs sm:tw-leading-[14px] ${
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

export default Input;
