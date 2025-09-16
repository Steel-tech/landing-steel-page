import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { contactSchema } from "@/lib/validations"
import { successResponse, validationErrorResponse, serverErrorResponse, rateLimitErrorResponse } from "@/lib/api-response"
import { isRateLimited } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    if (isRateLimited(request)) {
      return rateLimitErrorResponse()
    }

    const body = await request.json()

    // Validate request data
    const validationResult = contactSchema.safeParse(body)
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message || "Invalid data"
      return validationErrorResponse(errorMessage)
    }

    const { name, email, subject, message } = validationResult.data

    // Save contact to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message
      }
    })

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to contact

    return successResponse(
      { id: contact.id },
      "Message sent successfully! We'll get back to you soon."
    )

  } catch (error) {
    console.error("Contact submission error:", error)
    return serverErrorResponse("Failed to send message. Please try again.")
  }
}