import { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '@hooks/useUserContext';
import Head from '@components/common/Head';
import { login } from '@services/auth';
import type { FormField } from '@apptypes/form';
import type { LoginBody } from '@apptypes/auth';
import Loader from '@src/ui/Loader';

const title = 'Login';
const DEFAULT_ERROR_MESSAGE = 'Invalid username/email or password';

type LoginFormFields = {
  identity: FormField;
  password: FormField;
};

const formFields: LoginFormFields = {
  identity: {
    type: 'text',
    label: 'Username or Email',
    ref: null,
  },
  password: {
    type: 'password',
    label: 'Password',
    ref: null,
  },
};

export const Component = () => {
  const { setIsAuthenticated } = useUserContext();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const identityRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  formFields.identity.ref = identityRef;
  formFields.password.ref = passwordRef;

  const [authError, setAuthError] = useState<string>('');

  const checkError = useCallback(
    (e: HTMLInputElement): { isError: boolean } => {
      if (e.value === '') {
        return {
          isError: true,
        };
      }

      return {
        isError: false,
      };
    },
    [],
  );

  const validate = useCallback((): boolean => {
    let isValid = true;

    Object.values(formFields).forEach((formField: FormField) => {
      if (formField.ref != null) {
        const { isError } = checkError(
          formField.ref.current as HTMLInputElement,
        );

        isValid = isValid && !isError;
      }
    });

    if (isValid) {
      setAuthError('');
    } else {
      setAuthError(DEFAULT_ERROR_MESSAGE);
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

        const values: LoginBody = {
          identity: '',
          password: '',
        };

        Object.entries(formFields).forEach(
          ([key, formField]: [string, FormField]) => {
            if (formField.ref != null) {
              values[key as keyof LoginBody] = (
                formField.ref.current as HTMLInputElement
              ).value;
              (formField.ref.current as HTMLInputElement).value = '';
            }
          },
        );

        try {
          const { data } = await login(values);
          if (data?.status) {
            setIsAuthenticated(true);
          } else {
            setAuthError(data?.message ?? DEFAULT_ERROR_MESSAGE);
          }
        } catch (error: any) {
          console.error(error);
          setAuthError(error?.response?.data?.message ?? DEFAULT_ERROR_MESSAGE);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [validate, setIsAuthenticated, isSubmitting],
  );

  return (
    <>
      <Head title={title} />
      <main className="auth-main">
        {isSubmitting && <Loader />}
        <div className="auth-form-container">
          {authError !== '' && (
            <div className="auth-form-feedback-container">
              <h2 className="auth-form-feedback-heding">Wrong Credentials</h2>
              <span className="auth-form-feedback-message">{authError}</span>
            </div>
          )}
          <form
            method="post"
            acceptCharset="UTF-8"
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            autoCorrect="false"
          >
            {Object.entries(formFields).length !== undefined &&
              Object.entries(formFields).length > 0 &&
              Object.entries(formFields).map(
                ([key, formField]: [string, FormField]) => (
                  <div key={key} className="form-row login-form-row">
                    <div className="form-inner-row">
                      <div className="form-col form-label-container">
                        <label className="form-label" htmlFor={key}>
                          {formField.label}
                        </label>
                      </div>
                      <div className="form-col form-control-container">
                        <input
                          ref={formField.ref}
                          type={formField.type}
                          className={`form-control form-control-spacing`}
                          name={key}
                          id={key}
                        />
                      </div>
                    </div>
                  </div>
                ),
              )}
            <div className="auth-btn-container">
              <input
                type="submit"
                className="auth-btn auth-submit-btn"
                value="Login"
                disabled={isSubmitting}
              />
            </div>
          </form>
          <div className="auth-form-bottom">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="underlined-link">
                register
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

Component.displayName = 'Login';
