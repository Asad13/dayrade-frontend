import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type CSSProperties,
} from 'react';

export type Option = {
  value: string;
  label: string;
};

export type Options = Array<string | Option>;

interface SelectProps {
  placeholder?: string;
  ariaLabel?: string;
  options: Options;
  initialSelectedValuePos?: number;
  selectValue: (value: string) => void;
  isError?: boolean;
  disabled?: boolean;
  selectContainerClassNames?: string;
  selectContainerStyles?: CSSProperties;
  selectClassNames?: string;
  selectStyles?: CSSProperties;
  optionContainerClassNames?: string;
  optionContainerStyles?: CSSProperties;
  optionClassNames?: string;
  optionStyles?: CSSProperties;
}

const Select = ({
  placeholder = 'Select a value',
  ariaLabel = 'Select',
  options,
  initialSelectedValuePos,
  selectValue,
  isError = false,
  disabled = false,
  selectContainerClassNames,
  selectContainerStyles,
  selectClassNames,
  selectStyles,
  optionContainerClassNames,
  optionContainerStyles,
  optionClassNames,
  optionStyles,
}: SelectProps) => {
  const allOptions: Array<Option> = [];

  options.forEach((option: string | Option) => {
    if (typeof option === 'string') {
      allOptions.push({ value: option, label: option });
    } else {
      allOptions.push(option);
    }
  });

  const [selectedValuePos, setSelectedValuePos] = useState<number | undefined>(
    initialSelectedValuePos,
  );
  const [open, setOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleChange = useCallback(
    (newSelectedOption: Option, newSelectedOptionPos: number) => {
      if (!disabled) {
        setSelectedValuePos(newSelectedOptionPos);
        setOpen(false);
        selectValue(newSelectedOption.value);
      }
    },
    [selectValue, disabled],
  );

  return (
    <div
      className={`select-container ${
        selectContainerClassNames !== undefined && selectContainerClassNames
      }`}
      style={selectContainerStyles ? selectContainerStyles : {}}
      ref={selectRef}
    >
      <div
        className={`select ${isError && 'select-error'} ${
          disabled && 'select-disabled'
        }
        ${selectClassNames !== undefined && selectClassNames}`}
        style={selectStyles ? selectStyles : {}}
        aria-label={ariaLabel}
        aria-expanded={open && !disabled}
        role="select"
        aria-roledescription="Select element to select from multiple options"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedValuePos !== undefined &&
        selectedValuePos >= 0 &&
        selectedValuePos < allOptions.length ? (
          <div className="select-selected-option">
            <span>{allOptions[selectedValuePos].label}</span>
          </div>
        ) : (
          <div>
            <span>{placeholder}</span>
          </div>
        )}
      </div>
      {open && !disabled && (
        <div
          className={`select-options-container ${
            optionContainerClassNames !== undefined && optionContainerClassNames
          }`}
          style={optionContainerStyles ? optionContainerStyles : {}}
        >
          {allOptions.map((option: Option, index: number) => (
            <div
              key={option.value}
              className={`select-option ${
                optionClassNames !== undefined && optionClassNames
              }`}
              style={optionStyles ? optionStyles : {}}
              role="option"
              aria-roledescription="Option element to provide option to the select element"
              onClick={() => handleChange(option, index)}
            >
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
