import React from 'react';

export type FormField = {
  type: string;
  label: string;
  ref: React.RefObject<HTMLInputElement> | null;
};

export interface FormControlAttributes {
  name: string;
  id?: string;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface InputAttributes extends FormControlAttributes {
  type: string;
  defaultValue?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextAreaAttributes extends FormControlAttributes {
  rows?: number;
  cols?: number;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface InputField extends InputAttributes {
  label: string;
}

export type Countries = Record<string, string>;
export type CountryCode = keyof Countries;
