import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),

  email: z.email("Please enter a valid email address"),

  company: z.string().trim().min(2, "Company name is required"),

  phone: z.string().trim().min(7, "Please enter a valid phone number"),

  interest: z.string().trim().min(1, "Please select an interest"),

  country: z.string().trim().min(1, "Please select a country"),

  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
