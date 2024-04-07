import type { ReactElement } from 'react';

interface FormRow {
  label: string;
  supportingText?: string;
  children: ReactElement<HTMLInputElement>;
}

const FormRow = ({ label, supportingText, children }: FormRow) => {
  return (
    <div className="settings-form-row">
      <div className="settings-form-inner-row">
        <div className="settings-label-container">
          <h5 className="heading5">{label}</h5>
          {supportingText !== undefined && (
            <p className="text2">{supportingText}</p>
          )}
        </div>
        <div className="settings-inputs-container">{children}</div>
      </div>
    </div>
  );
};

export default FormRow;
