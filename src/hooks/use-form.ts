/* eslint-disable @typescript-eslint/no-explicit-any */
import { STORAGE_KEY } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useValidationStatus = () => {
  const [emailStatus, setEmailStatus] = useState<ValidationStatus>("idle");
  const [usernameStatus, setUsernameStatus] =
    useState<ValidationStatus>("idle");

  return {
    emailStatus,
    setEmailStatus,
    usernameStatus,
    setUsernameStatus,
  };
};

export const useFormPersistence = (form: any) => {
  const { setValue, watch } = form;

  // Load saved data on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem(STORAGE_KEY);
    if (!savedData) return;

    try {
      const parsedData = JSON.parse(savedData);
      Object.entries(parsedData).forEach(([key, value]) => {
        if (value && typeof value === "string") {
          setValue(key, value);
        }
      });

      // Set password confirmation to match password if it exists
      if (parsedData.password) {
        setValue("password_confirmation", parsedData.password);
      }
    } catch (error) {
      console.error("Error parsing saved registration data:", error);
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [setValue]);

  // Save data when form changes
  useEffect(() => {
    const subscription = watch((values: Step1FormValues) => {
      const hasData = values.name || values.username || values.email;
      if (hasData) {
        const dataToSave = {
          name: values.name || "",
          username: values.username || "",
          email: values.email || "",
          password: values.password || "",
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);
};

export const useFieldValidation = (
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
