import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import type { CheckboxAndRadioAttributes } from '../../types/form';

export interface ToogleBoxProps {
  ariaLabel?: string;
  isError?: boolean;
  showErrorMsg?: boolean;
  errorMsg?: string;
  errorMsgClassNames?: string;
  disbaledClassNames?: string;
  outerBoxClassNames?: string;
  outerBoxStyles?: CSSProperties;
  // innerCircleClassNames?: string;
  // innerCircleStyles?: CSSProperties;
  errorClassNames?: string;
}

export type ToogleBoxPropsWithAttributes = CheckboxAndRadioAttributes &
  ToogleBoxProps;

const ToggleBox = forwardRef<HTMLInputElement, ToogleBoxPropsWithAttributes>(
  (
    {
      name,
      id,
      ariaLabel = '',
      checked,
      onChange,
      onBlur,
      disabled = false,
      required = true,
      isError = false,
      showErrorMsg = false,
      errorMsgClassNames,
      errorMsg = '',
      disbaledClassNames,
      outerBoxClassNames,
      outerBoxStyles,
      errorClassNames,
      // innerCircleClassNames,
      // innerCircleStyles,
    },
    ref,
  ) => {
    const toggleBoxAttributes: CheckboxAndRadioAttributes = {
      name,
      id: id ?? name,
      disabled,
      required,
    };

    if (checked !== undefined) {
      toggleBoxAttributes.checked = checked;
    }

    if (onBlur !== undefined) {
      toggleBoxAttributes.onBlur = onBlur;
    }

    if (onChange !== undefined) {
      toggleBoxAttributes.onChange = onChange;
    }

    return (
      <div className="tw-inline-flex tw-flex-col">
        <span aria-label={ariaLabel} className="tw-inline-block">
          <input
            ref={ref}
            type="checkbox"
            {...toggleBoxAttributes}
            className="tw-peer tw-invisible tw-w-0 tw-appearance-none"
          />
          <label
            htmlFor={name}
            className={`tw-relative tw-inline-block tw-h-6 tw-w-12 tw-cursor-pointer tw-rounded-full tw-bg-on-dark-emphasized tw-transition-all tw-duration-300 after:tw-absolute after:tw-left-1 after:tw-top-[2px] after:tw-h-5 after:tw-w-5 after:tw-rounded-full after:tw-bg-background-dark after:tw-transition-all after:tw-duration-300 after:tw-content-[''] peer-checked:tw-bg-primary-dark peer-checked:after:tw-left-6 ${
              outerBoxClassNames !== undefined && outerBoxClassNames
            } ${errorClassNames !== undefined && isError && errorClassNames} ${
              disabled && disbaledClassNames
            }`}
            style={outerBoxStyles !== undefined ? outerBoxStyles : {}}
          ></label>
        </span>
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

export default ToggleBox;
