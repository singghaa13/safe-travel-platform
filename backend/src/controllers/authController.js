import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { asyncHandler } from '../utils/errorHandler.js'
import { AppError } from '../utils/errorHandler.js'

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

// Generate Refresh Token
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, userType } = req.body

  // Check if user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new AppError('User with this email already exists', 400)
  }

  // Create user
  const userData = {
    firstName,
    lastName,
    email,
    password,
    phone,
    userType
  }

  // Add emergency contacts if provided
  if (req.body.emergencyContacts) {
    userData.emergencyContacts = req.body.emergencyContacts
  }

  const user = await User.create(userData)

  // Generate tokens
  const token = generateToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  // Remove password from response
  const userResponse = user.toJSON()

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: userResponse,
      token,
      refreshToken
    }
  })
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new AppError('Invalid credentials', 401)
  }

  // Check if account is locked
  if (user.isLocked()) {
    throw new AppError('Account is temporarily locked due to too many failed login attempts. Please try again later.', 423)
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password)
  if (!isPasswordValid) {
    // Increment login attempts
    await user.incLoginAttempts()
    throw new AppError('Invalid credentials', 401)
  }

  // Reset login attempts on successful login
  await user.resetLoginAttempts()

  // Update last login
  user.lastLogin = new Date()
  await user.save()

  // Generate tokens
  const token = generateToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  // Remove password from response
  const userResponse = user.toJSON()

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: userResponse,
      token,
      refreshToken
    }
  })
})

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  // In a real application, you might want to blacklist the token
  // For now, we'll just return a success message
  // The client should remove the token from storage
  
  res.json({
    success: true,
    message: 'Logout successful'
  })
})

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.body

  if (!token) {
    throw new AppError('Refresh token is required', 400)
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    if (decoded.type !== 'refresh') {
      throw new AppError('Invalid token type', 401)
    }

    // Check if user still exists
    const user = await User.findById(decoded.userId)
    if (!user || !user.isActive) {
      throw new AppError('User not found or inactive', 401)
    }

    // Generate new access token
    const newToken = generateToken(user._id)

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token: newToken
      }
    })
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new AppError('Invalid refresh token', 401)
    }
    if (error.name === 'TokenExpiredError') {
      throw new AppError('Refresh token expired', 401)
    }
    throw error
  }
})

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    // Don't reveal if user exists or not for security
    return res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.'
    })
  }

  // Generate reset token (in a real app, this would be sent via email)
  const resetToken = jwt.sign(
    { userId: user._id, type: 'reset' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  // TODO: Send email with reset link
  console.log('Password reset token:', resetToken)

  res.json({
    success: true,
    message: 'If an account with that email exists, a password reset link has been sent.'
  })
})

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body

  try {
    // Verify reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    if (decoded.type !== 'reset') {
      throw new AppError('Invalid token type', 401)
    }

    // Find user
    const user = await User.findById(decoded.userId)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    // Update password
    user.password = password
    await user.save()

    res.json({
      success: true,
      message: 'Password reset successful'
    })
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new AppError('Invalid reset token', 401)
    }
    if (error.name === 'TokenExpiredError') {
      throw new AppError('Reset token expired', 401)
    }
    throw error
  }
})
