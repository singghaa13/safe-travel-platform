import express from 'express'
import { body } from 'express-validator'
import { 
  getProfile, 
  updateProfile, 
  updateSafetyPreferences,
  updateEmergencyContacts,
  deleteAccount,
  getUserTrips,
  getUserBookings,
  uploadProfileImage
} from '../controllers/userController.js'
import { validateRequest } from '../utils/validation.js'
import { authenticate } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

// Validation rules
const profileUpdateValidation = [
  body('firstName').optional().trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastName').optional().trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('dateOfBirth').optional().isISO8601().withMessage('Date of birth must be a valid date'),
  body('nationality').optional().trim().isLength({ min: 2 }).withMessage('Nationality must be at least 2 characters'),
  body('preferences').optional().isObject().withMessage('Preferences must be an object')
]

const safetyPreferencesValidation = [
  body('locationSharing').isBoolean().withMessage('Location sharing must be a boolean'),
  body('emergencyAlerts').isBoolean().withMessage('Emergency alerts must be a boolean'),
  body('safetyLevel').isIn(['high', 'medium', 'standard']).withMessage('Invalid safety level'),
  body('notifications').isObject().withMessage('Notifications must be an object'),
  body('accessibility').optional().isObject().withMessage('Accessibility must be an object')
]

const emergencyContactsValidation = [
  body('primaryContact').isObject().withMessage('Primary contact is required'),
  body('primaryContact.name').trim().notEmpty().withMessage('Primary contact name is required'),
  body('primaryContact.phone').isMobilePhone().withMessage('Primary contact phone must be valid'),
  body('primaryContact.relationship').trim().notEmpty().withMessage('Primary contact relationship is required'),
  body('secondaryContact').optional().isObject().withMessage('Secondary contact must be an object'),
  body('secondaryContact.name').optional().trim().notEmpty().withMessage('Secondary contact name is required'),
  body('secondaryContact.phone').optional().isMobilePhone().withMessage('Secondary contact phone must be valid'),
  body('secondaryContact.relationship').optional().trim().notEmpty().withMessage('Secondary contact relationship is required')
]

// Routes
router.get('/profile', getProfile)
router.put('/profile', profileUpdateValidation, validateRequest, updateProfile)
router.put('/safety-preferences', safetyPreferencesValidation, validateRequest, updateSafetyPreferences)
router.put('/emergency-contacts', emergencyContactsValidation, validateRequest, updateEmergencyContacts)
router.delete('/account', deleteAccount)

// User data
router.get('/trips', getUserTrips)
router.get('/bookings', getUserBookings)

// File upload
router.post('/profile-image', upload.single('image'), uploadProfileImage)

export default router
