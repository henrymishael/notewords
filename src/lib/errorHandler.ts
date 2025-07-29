// import { AxiosError } from "axios";
// import { ZodError } from "zod";

// export const isAxiosError = (
//   error: unknown
// ): error is AxiosError<{ message: string }> => {
//   return error instanceof AxiosError;
// };

// export const isYupError = (error: unknown): error is ZodError => {
//   return error instanceof ZodError;
// };

// export const isGenericError = (error: unknown): error is Error => {
//   return error instanceof Error;
// };

// export function parseError(
//   error: unknown,
//   errorMessages: Record<string, string> = {}
// ): string {
//   if (!error) return "__empty__";

//   const _errMsg = {
//     "401": "Unauthorized",
//     "403": "Forbidden",
//     "404": "Resource not found",
//     "500": "Internal server error",
//     ...errorMessages,
//   };

//   if (isAxiosError(error)) {
//     if (error.name === "CanceledError") return "Request canceled";
//     if (Array.isArray(error.response?.data?.message)) {
//       return error.response?.data?.message.join(", ");
//     }
//     if (
//       error.response?.data?.message &&
//       !error.response.data.message
//         .toLowerCase()
//         .includes("missing required resource to complete")
//     ) {
//       return error.response.data.message;
//     }
//     switch (error.response?.status) {
//       case 401:
//         return _errMsg["401"];
//       case 403:
//         return _errMsg["403"];
//       case 404:
//         return _errMsg["404"];
//       case 500:
//         return _errMsg["500"];
//       default:
//         return "Something went wrong";
//     }
//   }
//   if (isYupError(error)) {
//     return error.message;
//   }
//   if (isGenericError(error)) {
//     return error.message;
//   }
//   return "Something went wrong";
// }

import { AxiosError } from "axios";
import { ZodError } from "zod";

// Type for your backend validation error structure
interface ValidationErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}

export const isAxiosError = (
  error: unknown
): error is AxiosError<ValidationErrorResponse | { message: string }> => {
  return error instanceof AxiosError;
};

export const isZodError = (error: unknown): error is ZodError => {
  return error instanceof ZodError;
};

export const isGenericError = (error: unknown): error is Error => {
  return error instanceof Error;
};

// Helper function to check if response has validation errors structure
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasValidationErrors = (data: any): data is ValidationErrorResponse => {
  return (
    data &&
    typeof data.message === "string" &&
    data.errors &&
    typeof data.errors === "object"
  );
};

// Helper function to format validation errors
const formatValidationErrors = (errors: Record<string, string[]>): string => {
  const errorMessages = Object.values(errors).flat().filter(Boolean);

  return errorMessages.join(", ");
};

export function parseError(
  error: unknown,
  errorMessages: Record<string, string> = {}
): string {
  if (!error) return "__empty__";

  const _errMsg = {
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Resource not found",
    "422": "Validation failed", // Common for validation errors
    "500": "Internal server error",
    ...errorMessages,
  };

  if (isAxiosError(error)) {
    if (error.name === "CanceledError") return "Request canceled";

    const responseData = error.response?.data;

    // Handle your new validation error structure
    if (hasValidationErrors(responseData)) {
      // Option 1: Return field-specific errors (recommended for user-facing errors)
      return formatValidationErrors(responseData.errors);

      // Option 2: Return the general message (uncomment if preferred)
      // return responseData.message;
    }

    // Handle array of messages (existing logic)
    if (Array.isArray(responseData?.message)) {
      return responseData.message.join(", ");
    }

    // Handle single message (existing logic)
    if (
      responseData?.message &&
      !responseData.message
        .toLowerCase()
        .includes("missing required resource to complete")
    ) {
      return responseData.message;
    }

    // Handle by status code
    switch (error.response?.status) {
      case 401:
        return _errMsg["401"];
      case 403:
        return _errMsg["403"];
      case 404:
        return _errMsg["404"];
      case 422:
        return _errMsg["422"];
      case 500:
        return _errMsg["500"];
      default:
        return "Something went wrong";
    }
  }

  if (isZodError(error)) {
    return error.message;
  }

  if (isGenericError(error)) {
    return error.message;
  }

  return "Something went wrong";
}

// Additional utility function to get field-specific errors for form handling
export function getFieldErrors(
  error: unknown
): Record<string, string[]> | null {
  if (isAxiosError(error)) {
    const responseData = error.response?.data;
    if (hasValidationErrors(responseData)) {
      return responseData.errors;
    }
  }
  return null;
}
