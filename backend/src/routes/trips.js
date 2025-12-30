import express from 'express'
import { body } from 'express-validator'
import { 
  createTrip, 
  getTrips, 
  getTripById, 
  updateTrip, 
  deleteTrip,
  generateItinerary,
  bookTrip
} from '../controllers/tripController.js'
import { validateRequest } from '../utils/validation.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

// Validation rules
const tripValidation = [
  body('destination').trim().notEmpty().withMessage('Destination is required'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').isISO8601().withMessage('End date must be a valid date'),
  body('budget').optional().isNumeric().withMessage('Budget must be a number'),
  body('travelers').isInt({ min: 1, max: 20 }).withMessage('Number of travelers must be between 1 and 20'),
  body('tripType').isIn(['leisure', 'business', 'adventure', 'cultural', 'family', 'solo']).withMessage('Invalid trip type'),
  body('safetyLevel').isIn(['high', 'medium', 'standard']).withMessage('Invalid safety level')
]

const itineraryValidation = [
  body('destination').trim().notEmpty().withMessage('Destination is required'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').isISO8601().withMessage('End date must be a valid date'),
  body('preferences').isArray().withMessage('Preferences must be an array'),
  body('safetyRequirements').isArray().withMessage('Safety requirements must be an array')
]

// Routes
router.post('/', tripValidation, validateRequest, createTrip)
router.get('/', getTrips)
router.get('/:id', getTripById)
router.put('/:id', tripValidation, validateRequest, updateTrip)
router.delete('/:id', deleteTrip)

// AI Itinerary Generation
router.post('/generate-itinerary', itineraryValidation, validateRequest, generateItinerary)

// Booking
router.post('/:id/book', bookTrip)

export default router
