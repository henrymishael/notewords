import { getFieldErrors, parseError } from "@/lib/errorHandler";
import {
  checkEmail,
  checkUsername,
  logout,
  register,
  resendOTP,
  signin,
  verifyEmail,
} from "@/requests/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { error } from "console";
import jwt, { JwtPayload } from "jsonwebtoken";
import { signIn } from "next-auth/react";
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

// export function useLogin() {
//   const router = useRouter();

//   return useMutation({
//     mutationFn: (data: ILoginPayload) =>
//       signIn("credentials", { ...data, redirect: false }),
//     onSuccess: (data) => {
//       toast.success("Login successful");
//       localStorage.setItem("user", JSON.stringify(data));
//       router.push("/dashboard");
//     },
//     onError: (error) => {
//       toast.error(parseError(error));
//     },
//   });
// }

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ILoginPayload) => {
      const result = await signIn("credentials", {
        login: data.login,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: (data) => {
      if (data?.ok) {
        toast.success("Login successful");

        router.push("/dashboard");
      } else {
        toast.error("Login failed");
      }
    },
    onError: () => {
      toast.error("invalid credentials");
    },
  });
}

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ILoginPayload) => logout(data),
    onSuccess: () => {
      toast.success("Logout successful");
      window.localStorage.removeItem("user");
      router.push("/signin");
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

export function useCheckEmail() {
  return useMutation({
    mutationFn: (data: string) => checkEmail(data),
    onSuccess: (response: ICheckEmail) => {
      if (response.email_taken === false) {
        toast.success("Email available");
      } else {
        toast.error("Email already taken, try again");
      }
    },
    onError: (error: Error) => {
      toast.error("Error checking email availability", {
        description: error.message,
      });
    },
  });
}

export function useCheckUsername() {
  return useMutation({
    mutationFn: (data: string) => checkUsername(data),
    onSuccess: (response: ICheckUsername) => {
      if (response.username_taken === false) {
        toast.success("Username available");
      } else {
        toast.error("Username already taken, try again");
      }
    },
    onError: (error: Error) => {
      toast.error("Error checking username availability", {
        description: error.message,
      });
    },
  });
}

export function useIsAuth() {
  return useQuery({
    queryKey: ["isAuth"],
    queryFn: async () => {
      const res = await fetch("/api/auth", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        return { isAuth: false };
      }
      const data = await res.json();

      if (!data.token) {
        return { isAuth: false };
      }

      const decodedToken = jwt.decode(data.token) as JwtPayload;

      if (!decodedToken) {
        return { isAuth: false };
      }

      const tokenExpires = (decodedToken?.exp || 0) * 1000;

      if (tokenExpires - new Date().valueOf() < 0) {
        return { isAuth: false };
      }

      return { isAuth: true, token: data.token };
    },
  });
}
