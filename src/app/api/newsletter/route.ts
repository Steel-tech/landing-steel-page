import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { newsletterSchema } from "@/lib/validations"
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
    const validationResult = newsletterSchema.safeParse(body)
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message || "Invalid email"
      return validationErrorResponse(errorMessage)
    }

    const { email } = validationResult.data

    // Check if email already exists
    const existingLead = await prisma.lead.findFirst({
      where: {
        email,
        leadType: "NEWSLETTER"
      }
    })

    if (existingLead) {
      return successResponse(
        { alreadySubscribed: true },
        "You're already subscribed to our newsletter!"
      )
    }

    // Save newsletter signup as a lead
    const lead = await prisma.lead.create({
      data: {
        name: "Newsletter Subscriber",
        email,
        company: "Unknown",
        role: "Unknown",
        leadType: "NEWSLETTER"
      }
    })

    // TODO: Add to email newsletter service
    // TODO: Send welcome email

    return successResponse(
      { id: lead.id },
      "Successfully subscribed to newsletter!"
    )

  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return serverErrorResponse("Failed to subscribe. Please try again.")
  }
}