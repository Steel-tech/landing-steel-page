import { NextResponse } from "next/server"

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export function successResponse<T>(data: T, message?: string) {
  return NextResponse.json<ApiResponse<T>>({
    success: true,
    data,
    message
  })
}

export function errorResponse(error: string, status: number = 400) {
  return NextResponse.json<ApiResponse>({
    success: false,
    error
  }, { status })
}

export function validationErrorResponse(error: string) {
  return errorResponse(error, 400)
}

export function serverErrorResponse(error: string = "Internal server error") {
  return errorResponse(error, 500)
}

export function rateLimitErrorResponse() {
  return errorResponse("Too many requests. Please try again later.", 429)
}