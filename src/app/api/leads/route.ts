import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { leadSchema } from "@/lib/validations"
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
    const validationResult = leadSchema.safeParse(body)
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message || "Invalid data"
      return validationErrorResponse(errorMessage)
    }

    const { name, email, company, role, phone, message, leadType } = validationResult.data

    // Save lead to database
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        company,
        role,
        phone,
        message,
        leadType
      }
    })

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to lead

    return successResponse(
      { id: lead.id },
      "Thank you for your interest! We'll contact you within 24 hours."
    )

  } catch (error) {
    console.error("Lead submission error:", error)
    return serverErrorResponse("Failed to submit lead. Please try again.")
  }
}