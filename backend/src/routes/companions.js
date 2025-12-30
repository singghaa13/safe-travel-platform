import express from 'express'
import { body, query } from 'express-validator'
import { 
  getCompanions, 
  getCompanionById, 
  createCompanionProfile, 
  updateCompanionProfile,
  deleteCompanionProfile,
  bookCompanion,
  verifyCompanion,
  getCompanionReviews
} from '../controllers/companionController.js'
import { validateRequest } from '../utils/validation.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

// Public routes (no authentication required)
router.get('/', [
  query('location').optional().trim(),
  query('language').optional().trim(),
  query('specialty').optional().trim(),
  query('rating').optional().isFloat({ min: 0, max: 5 }),
  query('priceMin').optional().isNumeric(),
  query('priceMax').optional().isNumeric()
], validateRequest, getCompanions)

router.get('/:id', getCompanionById)
router.get('/:id/reviews', getCompanionReviews)

// Protected routes (authentication required)
router.use(authenticate)

// Companion profile management (only for companions themselves)
router.post('/', [
  body('languages').isArray().withMessage('Languages must be an array'),
  body('specialties').isArray().withMessage('Specialties must be an array'),
  body('hourlyRate').isNumeric({ min: 0 }).withMessage('Hourly rate must be a positive number'),
  body('availability').isObject().withMessage('Availability must be an object'),
  body('bio').trim().isLength({ min: 50, max: 500 }).withMessage('Bio must be between 50 and 500 characters')
], validateRequest, createCompanionProfile)

router.put('/:id', [
  body('languages').optional().isArray().withMessage('Languages must be an array'),
  body('specialties').optional().isArray().withMessage('Specialties must be an array'),
  body('hourlyRate').optional().isNumeric({ min: 0 }).withMessage('Hourly rate must be a positive number'),
  body('availability').optional().isObject().withMessage('Availability must be an object'),
  body('bio').optional().trim().isLength({ min: 50, max: 500 }).withMessage('Bio must be between 50 and 500 characters')
], validateRequest, updateCompanionProfile)

router.delete('/:id', deleteCompanionProfile)

// Booking companions
router.post('/:id/book', [
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').isISO8601().withMessage('End date must be a valid date'),
  body('travelers').isInt({ min: 1, max: 10 }).withMessage('Number of travelers must be between 1 and 10'),
  body('specialRequirements').optional().trim()
], validateRequest, bookCompanion)

// Admin routes (only for admins)
router.patch('/:id/verify', authorize(['admin']), verifyCompanion)

export default router
