import { _axios } from ".";

export const register = async (
  payload: IRegisterPayload
): Promise<IResponse<string>> => {
  const response = await _axios.post({
    url: "/register",
    payload,
    isFormData: true,
  });
  return response;
};

export const signin = async (
  payload: ILoginPayload
): Promise<IUserResponse> => {
  const response = await _axios.post({
    url: "/login",
    payload,
    isFormData: true,
  });
  return response;
};

export const logout = async (
  payload: ILoginPayload
): Promise<IResponse<string>> => {
  const response = await _axios.post({
    url: "/logout",
    payload,
    isFormData: true,
  });
  return response;
};

export const verifyEmail = async (
  payload: VerifyEmailPayload
): Promise<IResponse<string>> => {
  const response = await _axios.post({
    url: "/verify-otp",
    payload,
    isFormData: true,
  });
  return response;
};
export const resendOTP = async (
  payload: ResendOTPRequestPayload
): Promise<IResponse<string>> => {
  const response = await _axios.post({
    url: "/resend-otp",
    payload,
    isFormData: true,
  });
  return response;
};

export const checkUsername = async (login: string): Promise<ICheckUsername> => {
  const response = await _axios.get(
    `/check-username-availability?username=${login}`
  );
  return response;
};

export const checkEmail = async (email: string): Promise<ICheckEmail> => {
  const response = await _axios.get(`/check-email-availability?email=${email}`);
  return response;
};
