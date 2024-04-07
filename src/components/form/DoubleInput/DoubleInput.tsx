import React from 'react';
import { InputAttributes } from '@apptypes/form';

interface DoubleInputAttributes extends InputAttributes {
  ref?: React.RefObject<HTMLInputElement> | null;
}

interface DoubleInputProps {
  firstInput: DoubleInputAttributes;
  secondInput: DoubleInputAttributes;
}

const DoubleInput = ({ firstInput, secondInput }: DoubleInputProps) => {
  return (
    <div>
      <input
        {...firstInput}
        id={firstInput.name}
        className="double-input-form-control double-input-form-control-left"
      />
      <input
        {...secondInput}
        id={secondInput.name}
        className="double-input-form-control double-input-form-control-right"
      />
    </div>
  );
};

export default DoubleInput;
