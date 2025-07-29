import { getFieldErrors, parseError } from "@/lib/errorHandler";
import { login, register, resendOTP, verifyEmail } from "@/requests/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useRegister() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: IRegisterPayload) => register(data),
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/register/interests");
    },
    onError: (error) => {
      // const errorMessage = parseError(error);
      // toast.error(errorMessage);

      const fieldErrors = getFieldErrors(error);
      if (fieldErrors) {
        toast.error("Field errors:", fieldErrors);
      }
    },
  });
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ILoginPayload) => login(data),
    onSuccess: (data) => {
      toast.success("Login successful");
      localStorage.setItem("user", JSON.stringify(data.data));
      router.push("/");
    },
    onError: (error) => {
      toast.error(parseError(error));
    },
  });
}

export function useVerifyEmail() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: VerifyEmailPayload) => verifyEmail(data),
    onSuccess: () => {
      router.push("/signin");
      toast.success("Email successfully verified");
      sessionStorage.removeItem("registrationData");
    },
    onError: (error: Error) => {
      toast.error("Failed to verify email", {
        description: error.message || "An error occurred during verification",
      });
    },
  });
}

export function useResendOTP() {
  return useMutation({
    mutationFn: (data: ResendOTPRequestPayload) => resendOTP(data),
    onSuccess: () => {
      toast.success("OTP resent successfully");
    },
    onError: (error: Error) => {
      const errorMessage = parseError(error);
      toast.error(errorMessage);
    },
  });
}
