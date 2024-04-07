export interface LoginBody {
  identity: string;
  password: string;
}

export interface RegistrationBody {
  email: string;
  user_name: string;
  password: string;
  confirm_password: string;
  country: string;
}

export interface VerifyEmailBody {
  token: string;
}
