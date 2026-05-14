import z from "zod";
import { contactFormSchema } from "./contact-form-shcema";

export type ContactFormData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
  country: string;
  message: string;
};

export type ContactFormFieldErrors = Partial<ContactFormData>;

export type ContactFormResponeType = {
  errors: ContactFormFieldErrors;
  success: boolean;
  errorMessage: string | null;
};

export const validateContactForm = async (
  prevState: ContactFormResponeType,
  formData: FormData,
): Promise<ContactFormResponeType> => {
  const rawInput = Object.fromEntries(formData);

  const result = contactFormSchema.safeParse(rawInput);

  if (!result.success) {
    let errors: ContactFormFieldErrors = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = {
        ...errors,
        [key]: value[0],
      };
    }

    return {
      success: false,
      errors,
      errorMessage: null,
    };
  }

  console.log(result.data);

  return {
    success: true,
    errors: {},
    errorMessage: null,
  };
};
