type RegisterFormValues = z.infer<typeof registerSchema>;
type RegisterStep1Values = z.infer<typeof registerStep1Schema>;
type RegisterStep2Values = z.infer<typeof registerStep2Schema>;
type VerifyEmailPayload = z.infer<typeof VerifyEmailSchema>;
type ResendOTPRequestPayload = z.infer<typeof resendOTPRequestSchema>;
type Step1FormValues = z.infer<typeof step1Schema>;
type OTPFormValues = z.infer<typeof otpOnlySchema>;

interface IPostProps {
  url: string;
  payload?: object | FormData;
  isFormData?: boolean;
}

interface IResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

interface IRegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  interests: string[];
}
interface ILoginPayload {
  login: string;
  password: string;
}

interface ITopics {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
