"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { step1Schema } from "@/validations";
import { Check, X, Loader2 } from "lucide-react";
import { useCheckEmail, useCheckUsername } from "@/hooks/use-auth";
import { useEffect, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import { useFormPersistence, useValidationStatus } from "@/hooks/use-form";
import { DEBOUNCE_DELAY, MIN_USERNAME_LENGTH, STORAGE_KEY } from "@/lib/utils";

const useFieldValidation = (
  fieldValue: string,
  validationFn: (value: string) => void,
  setStatus: (status: ValidationStatus) => void,
  minLength = 0
) => {
  useEffect(() => {
    if (!fieldValue || fieldValue.length < minLength) {
      setStatus("idle");
      return;
    }

    setStatus("idle");
    validationFn(fieldValue);
  }, [fieldValue, validationFn, setStatus, minLength]);
};

// Utility functions
const getInputClassName = (status: ValidationStatus): string => {
  switch (status) {
    case "available":
      return "border-green-500 focus:border-green-500";
    case "taken":
      return "border-red-500 focus:border-red-500";
    default:
      return "";
  }
};

const renderValidationIcon = (status: ValidationStatus) => {
  switch (status) {
    case "checking":
      return <Loader2 size={16} className="animate-spin text-gray-400" />;
    case "available":
      return <Check size={16} className="text-green-600" />;
    case "taken":
      return <X size={16} className="text-red-600" />;
    default:
      return null;
  }
};

const getPasswordConfirmationClassName = (
  confirmValue: string,
  password: string
): string => {
  if (!confirmValue || !password) return "";
  return confirmValue === password
    ? "border-green-500 focus:border-green-500"
    : "border-red-500 focus:border-red-500";
};

// Main component
export default function RegisterStep1Page() {
  const router = useRouter();
  const { emailStatus, setEmailStatus, usernameStatus, setUsernameStatus } =
    useValidationStatus();

  const { mutate: checkEmail } = useCheckEmail();
  const { mutate: checkUsername } = useCheckUsername();

  const form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { handleSubmit, control, watch } = form;

  // Use form persistence hook
  useFormPersistence(form);

  // Watch field values
  const emailValue = watch("email");
  const usernameValue = watch("username");
  const password = watch("password");
  const passwordConfirmation = watch("password_confirmation");

  // Create debounced validation functions
  const debouncedEmailCheck = useCallback(
    debounce((email: string) => {
      if (!email?.includes("@")) return;

      setEmailStatus("checking");
      checkEmail(email, {
        onSuccess: (data: ICheckEmail) => {
          setEmailStatus(data.email_taken ? "taken" : "available");
        },
        onError: () => setEmailStatus("idle"),
      });
    }, DEBOUNCE_DELAY),
    [checkEmail, setEmailStatus]
  );

  const debouncedUsernameCheck = useCallback(
    debounce((username: string) => {
      if (!username || username.length < MIN_USERNAME_LENGTH) return;

      setUsernameStatus("checking");
      checkUsername(username, {
        onSuccess: (data: ICheckUsername) => {
          setUsernameStatus(data.username_taken ? "taken" : "available");
        },
        onError: () => setUsernameStatus("idle"),
      });
    }, DEBOUNCE_DELAY),
    [checkUsername, setUsernameStatus]
  );

  // Use field validation hooks
  useFieldValidation(emailValue, debouncedEmailCheck, setEmailStatus);
  useFieldValidation(
    usernameValue,
    debouncedUsernameCheck,
    setUsernameStatus,
    MIN_USERNAME_LENGTH
  );

  // Cleanup debounced functions
  useEffect(() => {
    return () => {
      debouncedEmailCheck.cancel();
      debouncedUsernameCheck.cancel();
    };
  }, [debouncedEmailCheck, debouncedUsernameCheck]);

  // Form submission
  const onSubmit = async (data: Step1FormValues) => {
    if (emailStatus === "taken" || usernameStatus === "taken") {
      return;
    }

    const registrationData = {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(registrationData));
    router.push("/register/interests");
  };

  // Form validation state
  const isFormDisabled = useMemo(
    () =>
      emailStatus === "taken" ||
      usernameStatus === "taken" ||
      emailStatus === "checking" ||
      usernameStatus === "checking",
    [emailStatus, usernameStatus]
  );

  // Password validation rules
  const passwordConfirmationRules = {
    validate: (value: string) => {
      if (!value) return "Please confirm your password";
      if (value !== password) return "Passwords do not match";
      return true;
    },
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl text-center font-semibold mb-2">
          Get Started on Notewords
        </h1>
        <p className="text-center text-gray-600">
          Step 1 of 2: Basic Information
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="e.g. johndoe"
                        {...field}
                        className={getInputClassName(usernameStatus)}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {renderValidationIcon(usernameStatus)}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="e.g. john.doe@techcorp.com"
                      {...field}
                      className={getInputClassName(emailStatus)}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {renderValidationIcon(emailStatus)}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="At least 8 characters"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password_confirmation"
            rules={passwordConfirmationRules}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                    className={getPasswordConfirmationClassName(
                      field.value,
                      password
                    )}
                  />
                </FormControl>
                <FormMessage />
                {field.value && password && (
                  <div className="text-xs mt-1">
                    {field.value === password ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <Check size={12} />
                        Passwords match
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1">
                        <X size={12} />
                        Passwords do not match
                      </span>
                    )}
                  </div>
                )}
              </FormItem>
            )}
          />

          <p className="text-xs text-left">
            By creating an account, you agree to NoteWord&apos;s{" "}
            <Link
              href="/terms"
              className="text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Use and Privacy policy
            </Link>
          </p>

          <Button
            className="bg-amber-400 text-white h-[54px] rounded-4xl font-semibold"
            type="submit"
            disabled={isFormDisabled}
          >
            Continue to Interests
          </Button>
        </form>
      </Form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link href="/signin" className="text-amber-400 font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
}
