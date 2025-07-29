"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResendOTP, useVerifyEmail } from "@/hooks/use-auth";
import { otpOnlySchema } from "@/validations";
import { Loader2 } from "lucide-react";

// Type for the registration data
type RegistrationData = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export default function VerifyEmailPage() {
  const router = useRouter();
  const [otp, setOTP] = useState("");
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);

  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpOnlySchema),
    mode: "all",
    defaultValues: {
      otp: "",
    },
  });

  const { mutate: verifyMutate, isPending: isVerifying } = useVerifyEmail();
  const { isPending: isResending, mutate: resendMutate } = useResendOTP();

  useEffect(() => {
    const storedData = sessionStorage.getItem("registrationData");
    if (!storedData) {
      router.push("/register");
      return;
    }

    try {
      const parsedData: RegistrationData = JSON.parse(storedData);
      setRegistrationData(parsedData);
    } catch {
      router.push("/register");
    }
  }, [router]);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = form;

  const onSubmit = handleSubmit((data) => {
    if (!registrationData) {
      toast.error("Registration data not found. Please register again.");
      router.push("/register");
      return;
    }

    // Prepare payload with stored username and entered OTP
    const payload: VerifyEmailPayload = {
      login: registrationData.username,
      otp: data.otp,
    };

    console.log("Submitting payload:", payload);
    verifyMutate(payload);
  });

  const handleResendOTP = () => {
    if (!registrationData) {
      toast.error("Registration data not found. Please register again.");
      router.push("/register");
      return;
    }

    resendMutate({ login: registrationData.email });
  };

  if (!registrationData) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div>
          <Loader2 />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-5">
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-semibold mb-2">
            Verify Email
          </p>
          <p className="text-xs text-gray-600">
            We&apos;ve sent a verification code to{" "}
            <span className="font-semibold">{registrationData?.email}</span>
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-5" onSubmit={onSubmit}>
            <div>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  setOTP(value);
                  setValue("otp", value, { shouldValidate: true });
                }}
                containerClassName="justify-center"
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot
                      index={i}
                      key={i}
                      className="w-10 h-10 xsm:w-14 xsm:h-14 md:w-16 md:h-16"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              {errors.otp?.message && (
                <p className="text-red-600 text-xs pt-2 text-center">
                  {errors.otp?.message}
                </p>
              )}
            </div>

            <p className="text-sm text-eke-black-300 text-center">
              Didn&apos;t get the code?{" "}
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResending}
                className="text-amber-400 font-semibold pl-1 hover:underline disabled:opacity-50 cursor-pointer"
              >
                {isResending ? "Sending..." : "Resend Code"}
              </button>
            </p>

            <Button
              type="submit"
              className="py-7 bg-amber-400 text-white text-[20px] font-medium rounded-4xl w-full"
              disabled={isVerifying || !isValid}
            >
              {isVerifying ? "Verifying..." : "Submit"}
            </Button>
            <p className="text-sm text-center">
              <span className="text-gray-500">Already have an account?</span>{" "}
              <Link
                href="/signin"
                className="text-amber-400 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
