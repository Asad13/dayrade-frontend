import { axiosPublic, axiosPrivate } from '@src/utils/axiosInstances';
import type {
  LoginBody,
  RegistrationBody,
  VerifyEmailBody,
} from '@src/types/auth';

export const register = (body: RegistrationBody) =>
  axiosPublic.post('/v1/auth/signup', body);

export const verifyEmail = (body: VerifyEmailBody, signal: AbortSignal) =>
  axiosPublic.post('/v1/auth/verify-email', body, { signal: signal });

export const login = (body: LoginBody) =>
  axiosPublic.post('/v1/auth/login', body);

export const checkUserName = async (
  body: { user_name: string },
  signal: AbortSignal,
) => {
  try {
    const { data } = await axiosPublic.post('/v1/auth/check-username', body, {
      signal: signal,
    });

    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const checkAuth = async () => {
  try {
    const { data } = await axiosPrivate.post(
      '/v1/auth/check',
      {},
      // { signal: signal },
    );

    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const logout = () => axiosPrivate.post('/v1/auth/logout', {});
