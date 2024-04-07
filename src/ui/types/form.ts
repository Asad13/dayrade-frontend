import React from 'react';

export interface FormControlAttributes {
  name: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface InputAttributes extends FormControlAttributes {
  value?: string | number;
  placeholder?: string;
  type: string;
  defaultValue?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputFormField {
  label?: string;
  inputAttributes: InputAttributes;
  ref?: React.RefObject<HTMLInputElement> | null;
}

export interface CheckboxAndRadioAttributes extends FormControlAttributes {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxAndRadioFormField {
  label?: string;
  checkboxAndRadioAttributes: CheckboxAndRadioAttributes;
  ref?: React.RefObject<HTMLInputElement> | null;
}

export interface TextAreaAttributes extends FormControlAttributes {
  rows?: number;
  cols?: number;
  value?: string | number;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface TextAreaFormField {
  label?: string;
  textAreaAttributes: TextAreaAttributes;
  ref?: React.RefObject<HTMLTextAreaElement> | null;
}
