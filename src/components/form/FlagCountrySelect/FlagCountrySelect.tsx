import { useState, useRef, useCallback, useEffect } from 'react';
import { countries } from '@assets/data/countries';
import type { Countries, CountryCode } from '@apptypes/form';

interface FlagCountrySelectProps {
  selectedCountry: CountryCode;
  setSelectedCountry: (countryCode: CountryCode) => void;
  isError?: boolean;
  disabled?: boolean;
}

export type Ref = HTMLSelectElement;

const FlagCountrySelect = ({
  selectedCountry,
  setSelectedCountry,
  isError = false,
  disabled = false,
}: FlagCountrySelectProps) => {
  // const [selectedCountry, setSelectedCountry] = useState<string>(value ?? '');
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
    (countryCode: string) => {
      if (!disabled) {
        // setSelectedCountry(countryCode);
        setSelectedCountry(countryCode);
        setOpen(false);
      }
    },
    [setSelectedCountry, disabled],
  );

  return (
    <div className="select-container" ref={selectRef}>
      <div
        className={`select ${isError && 'select-error'} ${
          disabled && 'select-disabled'
        }`}
        aria-label="Select your country"
        aria-expanded={open && !disabled}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedCountry !== '' ? (
          <div className="select-selected-option">
            <span className="flag-country-select-icon-container">
              <img
                className="flag-country-select-icon"
                src={`/flags/${selectedCountry.toLowerCase()}.svg`}
                alt={selectedCountry}
              />
            </span>
            <span>{countries[selectedCountry as keyof Countries]}</span>
          </div>
        ) : (
          <div>
            <span>Select a country</span>
          </div>
        )}
      </div>
      {open && !disabled && (
        <div className="select-options-container flag-country-select-options-container custom-scrollbar">
          {Object.keys(countries).map((countryCode) => (
            <div
              key={countryCode}
              className="select-option"
              onClick={() => handleChange(countryCode)}
            >
              <span className="flag-country-select-icon-container">
                <img
                  className="flag-country-select-icon"
                  src={`/flags/${countryCode.toLowerCase()}.svg`}
                  alt={selectedCountry}
                />
              </span>
              <span>{countries[countryCode as keyof Countries]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlagCountrySelect;
