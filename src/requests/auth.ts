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

export const login = async (
  payload: ILoginPayload
): Promise<IResponse<string>> => {
  const response = await _axios.post({
    url: "/login",
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
