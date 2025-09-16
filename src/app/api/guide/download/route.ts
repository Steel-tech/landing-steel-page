import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { errorResponse, rateLimitErrorResponse } from "@/lib/api-response"
import { isRateLimited } from "@/lib/rate-limit"
import path from "path"
import fs from "fs"

export async function GET(request: NextRequest) {
  try {
    // Rate limiting check (more lenient for downloads)
    if (isRateLimited(request, { maxRequests: 10, windowMs: 60000 })) {
      return rateLimitErrorResponse()
    }

    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return errorResponse("Email parameter required", 400)
    }

    // Verify email exists in leads (guide download should create lead first)
    const existingLead = await prisma.lead.findFirst({
      where: {
        email,
        leadType: "GUIDE"
      }
    })

    if (!existingLead) {
      return errorResponse("Please submit your information first to download the guide", 403)
    }

    // Check if guide file exists
    const guidePath = path.join(process.cwd(), "public", "steel-automation-guide.pdf")

    if (!fs.existsSync(guidePath)) {
      // For now, return a placeholder response
      return errorResponse("Guide temporarily unavailable. Please try again later.", 404)
    }

    // Read and serve the PDF file
    const fileBuffer = fs.readFileSync(guidePath)

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Steel-Construction-Automation-Guide.pdf"',
        "Cache-Control": "private, no-cache"
      }
    })

  } catch (error) {
    console.error("Guide download error:", error)
    return errorResponse("Failed to download guide. Please try again.", 500)
  }
}