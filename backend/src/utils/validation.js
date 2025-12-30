import { validationResult } from 'express-validator'

// Middleware to validate request data
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }))
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages
    })
  }
  
  next()
}

// Custom validation helpers
export const validateObjectId = (value) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/
  return objectIdPattern.test(value)
}

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

export const validatePhone = (phone) => {
  const phonePattern = /^[\+]?[1-9][\d]{0,15}$/
  return phonePattern.test(phone.replace(/[\s\-\(\)]/g, ''))
}

export const validateDate = (date) => {
  const dateObj = new Date(date)
  return dateObj instanceof Date && !isNaN(dateObj)
}

export const validateUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Sanitization helpers
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str
  return str.trim().replace(/[<>]/g, '')
}

export const sanitizeEmail = (email) => {
  if (typeof email !== 'string') return email
  return email.trim().toLowerCase()
}

export const sanitizePhone = (phone) => {
  if (typeof phone !== 'string') return phone
  return phone.replace(/[\s\-\(\)]/g, '')
}
