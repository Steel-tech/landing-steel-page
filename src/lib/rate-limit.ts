import { NextRequest } from "next/server"

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

export function isRateLimited(
  request: NextRequest,
  config: RateLimitConfig = { maxRequests: 5, windowMs: 60000 } // 5 requests per minute
): boolean {
  const clientIP = getClientIP(request)
  const now = Date.now()
  const key = `rate_limit:${clientIP}`

  // Clean up expired entries
  if (store[key] && now > store[key].resetTime) {
    delete store[key]
  }

  // Initialize or increment counter
  if (!store[key]) {
    store[key] = {
      count: 1,
      resetTime: now + config.windowMs
    }
    return false
  }

  store[key].count++
  return store[key].count > config.maxRequests
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown"
  }

  if (realIP) {
    return realIP
  }

  return "unknown"
}