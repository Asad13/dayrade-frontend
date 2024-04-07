import { useState, useCallback, useRef, type ChangeEvent } from 'react';
import FormRow from '../common/FormRow';
import { Input } from '@ui/form';
import type { InputProps } from '@ui/form';
import type { InputFormField } from '@ui/types/form';

type Keys = {
  old_password: any;
  new_password: any;
  confirm_new_password: any;
};

type ErrorMessagesValues = Keys & {
  old_password: Record<string, string>;
  new_password: Record<string, string>;
  confirm_new_password: Record<string, string>;
};

const ERROR_MESSAGES: ErrorMessagesValues = {
  old_password: {
    empty: 'Old Passowrd is required',
  },
  new_password: {
    empty: 'New Password is required',
    length: 'New Password must be between 8 to 30 more characters long',
  },
  confirm_new_password: {
    empty: 'Confirm New Password is required',
    mismatch: "Confirm New Password doesn't match with New Password",
  },
};

type ErrorMessages = Keys & {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};

const initialErrorMsgs: ErrorMessages = {
  old_password: '',
  new_password: '',
  confirm_new_password: '',
};

interface PasswordUpdateFormField extends InputFormField {
  supportingText?: string;
  inputProps?: InputProps;
}

type PasswordUpdateFormFields = Keys & {
  old_password: PasswordUpdateFormField;
  new_password: PasswordUpdateFormField;
  confirm_new_password: PasswordUpdateFormField;
};

const formFields: PasswordUpdateFormFields = {
  old_password: {
    label: 'Old Password',
    inputAttributes: {
      type: 'password',
      name: 'old_password',
      placeholder: "Your's Old Password",
    },
    inputProps: {
      showErrorMsg: true,
    },
    ref: null,
  },
  new_password: {
    label: 'New Password',
    inputAttributes: {
      type: 'password',
      name: 'new_password',
      placeholder: 'New Password',
    },
    inputProps: {
      showErrorMsg: true,
    },
    ref: null,
  },
  confirm_new_password: {
    label: 'Confirm New Password',
    inputAttributes: {
      type: 'password',
      name: 'confirm_new_password',
      placeholder: 'Confirm New Password',
    },
    inputProps: {
      showErrorMsg: true,
    },
    ref: null,
  },
};

const Password = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmNewPasswordRef = useRef<HTMLInputElement>(null);

  formFields.old_password.ref = oldPasswordRef;
  formFields.new_password.ref = newPasswordRef;
  formFields.confirm_new_password.ref = confirmNewPasswordRef;

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

      if (e.type === 'password' && e.name === 'new_password') {
        if (value.length < 8) {
          return {
            isError: true,
            message: ERROR_MESSAGES.new_password.length,
          };
        } else if (
          value !== confirmNewPasswordRef.current?.value &&
          confirmNewPasswordRef.current?.value.length !== undefined &&
          confirmNewPasswordRef.current?.value.length > 0
        ) {
          setErrors((prevs) => ({
            ...prevs,
            confirm_new_password: ERROR_MESSAGES.confirm_new_password.mismatch,
          }));

          return {
            isError: true,
            message: '',
          };
        } else {
          setErrors((prevs) => ({
            ...prevs,
            confirm_new_password: '',
          }));

          return {
            isError: false,
            message: '',
          };
        }
      }

      if (
        e.type === 'password' &&
        e.name === 'confirm_new_password' &&
        value !== newPasswordRef.current?.value
      ) {
        return {
          isError: true,
          message: ERROR_MESSAGES.confirm_new_password.mismatch,
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
        <h3 className={`heading3`}>Password</h3>
        <p className={`text2 tw-text-textSecondary`}>
          Please enter your current password to change your password.
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
            ([key, value]: [string, PasswordUpdateFormField]) => (
              <FormRow label={value.label as string} key={key}>
                <div className="settings-input-container">
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
                  <div className="settings-checkbox-field-container"></div>
                </div>
              </FormRow>
            ),
          )}
          <div className="settings-profile-btn-container">
            <input
              type="reset"
              className={`form-btn text2 ${
                isSubmitting && 'form-btn-submitting '
              }`}
              value="Cancel"
            />
            <input
              type="submit"
              className={`form-btn text2 ${
                isSubmitting && 'form-btn-submitting '
              }`}
              value="Update Password"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Password;
