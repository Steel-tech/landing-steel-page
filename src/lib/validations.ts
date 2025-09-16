import { z } from "zod"

// Lead form validation schema
export const leadSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email format"),
  company: z.string().min(1, "Company is required").max(100, "Company name too long"),
  role: z.string().min(1, "Role is required").max(100, "Role too long"),
  phone: z.string().optional(),
  message: z.string().max(500, "Message too long").optional(),
  leadType: z.enum(["DEMO", "CONSULTATION", "GUIDE", "NEWSLETTER"])
})

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject too long"),
  message: z.string().min(1, "Message is required").max(500, "Message too long")
})

// Newsletter signup validation schema
export const newsletterSchema = z.object({
  email: z.string().email("Invalid email format")
})

export type LeadFormData = z.infer<typeof leadSchema>
export type ContactFormData = z.infer<typeof contactSchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>