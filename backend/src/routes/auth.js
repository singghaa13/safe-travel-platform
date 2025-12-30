import express from 'express'
import { body } from 'express-validator'
import { register, login, logout, refreshToken, forgotPassword, resetPassword } from '../controllers/authController.js'
import { validateRequest } from '../utils/validation.js'

const router = express.Router()

// Validation rules
const registerValidation = [
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('userType').isIn(['traveler', 'companion', 'local']).withMessage('Invalid user type')
]

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
]

const forgotPasswordValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email')
]

const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
]

// Routes
router.post('/register', registerValidation, validateRequest, register)
router.post('/login', loginValidation, validateRequest, login)
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)
router.post('/forgot-password', forgotPasswordValidation, validateRequest, forgotPassword)
router.post('/reset-password', resetPasswordValidation, validateRequest, resetPassword)

export default router
