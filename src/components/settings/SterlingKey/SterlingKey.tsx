import { useState, useCallback, useRef, type ChangeEvent } from 'react';
import FormRow from '../common/FormRow';
import { Input } from '@ui/form';
import type { InputProps } from '@ui/form';
import type { InputFormField } from '@ui/types/form';

type Keys = {
  sterling_key: any;
};

type ErrorMessagesValues = Keys & {
  sterling_key: Record<string, string>;
};

const ERROR_MESSAGES: ErrorMessagesValues = {
  sterling_key: {
    empty: 'Provide a Key',
    invalid: 'Invalid Key',
  },
};

type ErrorMessages = Keys & {
  sterling_key: string;
};

const initialErrorMsgs: ErrorMessages = {
  sterling_key: '',
};

interface SterlingKeyFormField extends InputFormField {
  supportingText?: string;
  inputProps?: InputProps;
}

type SterlingKeyFormFields = Keys & {
  sterling_key: SterlingKeyFormField;
};

const formFields: SterlingKeyFormFields = {
  sterling_key: {
    label: 'Activation Key',
    supportingText: 'Get your account up and running',
    inputAttributes: {
      type: 'text',
      name: 'sterling_key',
      placeholder: 'Sterling key',
    },
    inputProps: {
      showErrorMsg: true,
    },
    ref: null,
  },
};

const SterlingKey = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const osterlingKeyRef = useRef<HTMLInputElement>(null);

  formFields.sterling_key.ref = osterlingKeyRef;

  const [errors, setErrors] = useState<ErrorMessages>({
    ...initialErrorMsgs,
  });

  const checkError = useCallback(
    (e: HTMLInputElement): { isError: boolean; message: string } => {
      const value = e.value.trim() ?? '';

      if (value === '') {
        return {
          isError: true,
          message: ERROR_MESSAGES[e.name as keyof typeof ERROR_MESSAGES].empty,
        };
      }

      return {
        isError: false,
        message: '',
      };
    },
    [],
  );

  const handleBlurAndChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { message } = checkError(e.target);
      if (errors[e.target.name as keyof typeof errors] !== message) {
        setErrors((prevs) => ({
          ...prevs,
          [e.target.name]: message,
        }));
      }
    },
    [checkError, errors],
  );

  const validate = useCallback((): boolean => {
    let isValid = true;
    const newErrorMsgs = { ...initialErrorMsgs };

    Object.entries(formFields).forEach(
      ([key, formField]: [string, InputFormField]) => {
        if (formField.ref != null) {
          const { isError, message } = checkError(
            formField.ref.current as HTMLInputElement,
          );
          newErrorMsgs[key as keyof typeof newErrorMsgs] = message;
          isValid = isValid && !isError;
        }
      },
    );

    if (!isValid) {
      setErrors((prevs) => ({
        ...prevs,
        ...newErrorMsgs,
      }));
    }

    return isValid;
  }, [checkError]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (isSubmitting) return;

      const isValid = validate();

      if (isValid) {
        // submit form
        setIsSubmitting(true);

        const values = {
          old_password: '',
          new_password: '',
          confirm_new_password: '',
        };

        Object.entries(formFields).forEach(
          ([key, formField]: [string, InputFormField]) => {
            if (formField.ref != null) {
              values[key as keyof typeof values] = (
                formField.ref.current as HTMLInputElement
              ).value;
            }
          },
        );

        try {
          // const { data } = await updatePassword(values);
          // if (data?.status) {
          //   Object.values(formFields).forEach((formField: InputFormField) => {
          //     if (formField.ref != null) {
          //       (formField.ref.current as HTMLInputElement).value = '';
          //     }
          //   });
          // } else {
          //   // show error toast
          // }
        } catch (error: any) {
          console.error(error);
          console.log(errors);

          if (
            error?.response?.data?.errors != null &&
            error?.response?.data?.errors !== undefined
          ) {
            setErrors((prevs) => ({
              ...prevs,
              ...error?.response?.data?.errors,
            }));
          }
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [validate, isSubmitting, errors],
  );

  return (
    <>
      <div className={`settings-tabpanel-heading-container`}>
        <h3 className={`heading3`}>Sterling Trade platform key</h3>
        <p className={`text2 tw-text-textSecondary`}>
          Activate your account permissions here.
        </p>
      </div>
      <div>
        <form
          method="post"
          acceptCharset="UTF-8"
          className="settings-tabs-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {Object.entries(formFields).map(
            ([key, value]: [string, SterlingKeyFormField]) => (
              <FormRow
                label={value.label as string}
                supportingText={value.supportingText}
                key={key}
              >
                <div className="settings-input-container lg:!tw-items-start">
                  <div className="settings-input-field-container">
                    <Input
                      ref={value.ref}
                      {...value.inputAttributes}
                      {...value.inputProps}
                      isError={errors[key as keyof ErrorMessages] !== ''}
                      errorMsg={errors[key as keyof ErrorMessages]}
                      onChange={handleBlurAndChange}
                      onBlur={handleBlurAndChange}
                      classNames="settings-input"
                      errorClassNames="!tw-border-error-dark focus:tw-border-error-dark"
                    />
                  </div>
                  <div className="settings-checkbox-field-container">
                    <input
                      type="submit"
                      className={`form-btn text2 settings-btn settings-btn-submit !tw-py-[11px] ${
                        isSubmitting && 'form-btn-submitting '
                      }`}
                      value="Activate Account"
                    />
                  </div>
                </div>
              </FormRow>
            ),
          )}
        </form>
      </div>
    </>
  );
};

export default SterlingKey;
