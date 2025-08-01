type RegisterFormValues = z.infer<typeof registerSchema>;
type RegisterStep1Values = z.infer<typeof registerStep1Schema>;
type RegisterStep2Values = z.infer<typeof registerStep2Schema>;
type VerifyEmailPayload = z.infer<typeof VerifyEmailSchema>;
type ResendOTPRequestPayload = z.infer<typeof resendOTPRequestSchema>;
type Step1FormValues = z.infer<typeof step1Schema>;
type OTPFormValues = z.infer<typeof otpOnlySchema>;
type ValidationStatus = "idle" | "checking" | "available" | "taken";

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

interface IUserResponse {
  token: string;
  user: IUser;
}

interface User {
  token: string;
  user: IUser;
}

interface ICheckUsername {
  username_taken: boolean;
}
interface ICheckEmail {
  email_taken: boolean;
}

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  profile_picture: null;
  country: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  user_type_id: number;
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

interface Step1FormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// NextAuth type extensions
