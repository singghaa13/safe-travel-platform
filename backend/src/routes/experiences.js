import express from 'express'
import { body, query } from 'express-validator'
import { 
  getExperiences, 
  getExperienceById, 
  createExperience, 
  updateExperience,
  deleteExperience,
  bookExperience,
  verifyExperience,
  getExperienceReviews,
  searchExperiences
} from '../controllers/experienceController.js'
import { validateRequest } from '../utils/validation.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

// Public routes (no authentication required)
router.get('/', [
  query('category').optional().trim(),
  query('location').optional().trim(),
  query('priceMin').optional().isNumeric(),
  query('priceMax').optional().isNumeric(),
  query('duration').optional().trim(),
  query('rating').optional().isFloat({ min: 0, max: 5 }),
  query('date').optional().isISO8601()
], validateRequest, getExperiences)

router.get('/search', [
  query('q').trim().notEmpty().withMessage('Search query is required'),
  query('location').optional().trim(),
  query('category').optional().trim()
], validateRequest, searchExperiences)

router.get('/:id', getExperienceById)
router.get('/:id/reviews', getExperienceReviews)

// Protected routes (authentication required)
router.use(authenticate)

// Experience creation and management (only for experience providers)
router.post('/', [
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('description').trim().isLength({ min: 50, max: 1000 }).withMessage('Description must be between 50 and 1000 characters'),
  body('category').isIn(['Food & Culture', 'Sightseeing', 'Cultural', 'Adventure', 'Wellness', 'Educational']).withMessage('Invalid category'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('duration').trim().notEmpty().withMessage('Duration is required'),
  body('price').isNumeric({ min: 0 }).withMessage('Price must be a positive number'),
  body('maxGroupSize').isInt({ min: 1, max: 50 }).withMessage('Max group size must be between 1 and 50'),
  body('images').isArray().withMessage('Images must be an array'),
  body('availability').isObject().withMessage('Availability must be an object'),
  body('safetyFeatures').isArray().withMessage('Safety features must be an array')
], validateRequest, createExperience)

router.put('/:id', [
  body('title').optional().trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('description').optional().trim().isLength({ min: 50, max: 1000 }).withMessage('Description must be between 50 and 1000 characters'),
  body('category').optional().isIn(['Food & Culture', 'Sightseeing', 'Cultural', 'Adventure', 'Wellness', 'Educational']).withMessage('Invalid category'),
  body('location').optional().trim().notEmpty().withMessage('Location is required'),
  body('duration').optional().trim().notEmpty().withMessage('Duration is required'),
  body('price').optional().isNumeric({ min: 0 }).withMessage('Price must be a positive number'),
  body('maxGroupSize').optional().isInt({ min: 1, max: 50 }).withMessage('Max group size must be between 1 and 50'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('availability').optional().isObject().withMessage('Availability must be an object'),
  body('safetyFeatures').optional().isArray().withMessage('Safety features must be an array')
], validateRequest, updateExperience)

router.delete('/:id', deleteExperience)

// Booking experiences
router.post('/:id/book', [
  body('date').isISO8601().withMessage('Date must be a valid date'),
  body('time').trim().notEmpty().withMessage('Time is required'),
  body('travelers').isInt({ min: 1, max: 20 }).withMessage('Number of travelers must be between 1 and 20'),
  body('specialRequirements').optional().trim(),
  body('emergencyContact').isObject().withMessage('Emergency contact information is required')
], validateRequest, bookExperience)

// Admin routes (only for admins)
router.patch('/:id/verify', authorize(['admin']), verifyExperience)

export default router
