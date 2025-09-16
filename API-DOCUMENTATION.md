# StructuPath Landing Page - Backend API Documentation

## Overview

Complete backend infrastructure for lead generation, contact forms, and newsletter signups for the StructuPath steel construction automation landing page.

## Database Models

### Lead
```prisma
model Lead {
  id        String   @id @default(cuid())
  name      String
  email     String
  company   String
  role      String
  phone     String?
  message   String?
  leadType  String   // DEMO, CONSULTATION, GUIDE, NEWSLETTER
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Contact
```prisma
model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String
  createdAt DateTime @default(now())
}
```

## API Endpoints

### 1. POST /api/leads
Submit demo requests and lead capture.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Steel Corp",
  "role": "Project Manager",
  "phone": "555-1234",
  "message": "Interested in demo",
  "leadType": "DEMO"
}
```

**Response:**
```json
{
  "success": true,
  "data": { "id": "clxyz123" },
  "message": "Thank you for your interest! We'll contact you within 24 hours."
}
```

**Lead Types:**
- `DEMO` - Demo request
- `CONSULTATION` - Consultation request
- `GUIDE` - Guide download
- `NEWSLETTER` - Newsletter signup

### 2. POST /api/contact
General contact form submissions.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Question about services",
  "message": "Can you provide more information about pricing?"
}
```

**Response:**
```json
{
  "success": true,
  "data": { "id": "clxyz456" },
  "message": "Message sent successfully! We'll get back to you soon."
}
```

### 3. POST /api/newsletter
Newsletter signups.

**Request Body:**
```json
{
  "email": "newsletter@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": { "id": "clxyz789" },
  "message": "Successfully subscribed to newsletter!"
}
```

### 4. GET /api/guide/download
Serve lead magnet PDF (requires prior lead submission).

**Query Parameters:**
- `email` (required) - Email of user who submitted guide request

**Response:**
- Success: PDF file download
- Error: JSON error response

### 5. GET /api/health
System health check.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Validation Rules

### All Forms
- Email format validation
- Required fields validation
- Rate limiting (5 requests per minute per IP)

### Lead Forms
- Name: 1-100 characters, required
- Email: Valid email format, required
- Company: 1-100 characters, required
- Role: 1-100 characters, required
- Phone: Optional
- Message: Max 500 characters, optional

### Contact Forms
- Name: 1-100 characters, required
- Email: Valid email format, required
- Subject: 1-200 characters, required
- Message: 1-500 characters, required

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

### HTTP Status Codes
- `200` - Success
- `400` - Validation error
- `403` - Forbidden (guide download without lead)
- `404` - Not found (guide file missing)
- `429` - Rate limit exceeded
- `500` - Server error

## Rate Limiting

- **Form submissions**: 5 requests per minute per IP
- **Guide downloads**: 10 requests per minute per IP
- **Health checks**: No limit

## Security Features

- Input validation with Zod schemas
- Rate limiting to prevent spam
- Input sanitization
- CORS protection (Next.js default)

## Database Setup

1. Install dependencies: `npm install`
2. Set environment variables in `.env.local`
3. Push schema: `npm run db:push`
4. Generate client: `npm run db:generate`

## Development

### Start Development Server
```bash
npm run dev
```

### Test APIs
```bash
node test-api.js
```

### Database Management
```bash
npm run db:studio  # Open Prisma Studio
npm run db:push    # Push schema changes
```

## TODO: Email Integration

The following email notifications are prepared but not yet implemented:

1. **Admin notifications** for new leads/contacts
2. **User confirmations** for form submissions
3. **Welcome emails** for newsletter signups

Integration points are marked with `// TODO:` comments in the API routes.

## File Structure

```
src/
├── app/api/
│   ├── leads/route.ts        # Lead submission endpoint
│   ├── contact/route.ts      # Contact form endpoint
│   ├── newsletter/route.ts   # Newsletter signup endpoint
│   ├── guide/download/route.ts # Guide download endpoint
│   └── health/route.ts       # Health check endpoint
├── lib/
│   ├── validations.ts        # Zod validation schemas
│   ├── api-response.ts       # Response utilities
│   ├── rate-limit.ts         # Rate limiting logic
│   └── prisma.ts            # Database client
└── prisma/
    └── schema.prisma         # Database schema
```

This backend infrastructure provides a complete, production-ready foundation for the StructuPath landing page lead generation system.