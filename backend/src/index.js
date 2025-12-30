import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// Import routes
import authRoutes from './routes/auth.js'
import tripRoutes from './routes/trips.js'
import companionRoutes from './routes/companions.js'
import experienceRoutes from './routes/experiences.js'
import userRoutes from './routes/users.js'

// Import middleware
import { errorHandler } from './utils/errorHandler.js'
import { notFound } from './utils/notFound.js'

// Load environment variables
dotenv.config({ path: './config.env' })

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB (optional for development)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/safe-travel')
    console.log('✅ Connected to MongoDB')
    return true
  } catch (err) {
    console.log('⚠️  MongoDB not available, running in demo mode')
    console.log('💡 To enable full functionality, install and start MongoDB')
    return false
  }
}

// Middleware
app.use(helmet()) // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}))
app.use(morgan('combined')) // Logging
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Safe Travel Platform API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
})

// Demo data for development without MongoDB
const demoData = {
  companions: [
    {
      id: '1',
      name: 'Sarah Johnson',
      location: 'Tokyo, Japan',
      rating: 4.8,
      specialties: ['Cultural Tours', 'Food Tours', 'Language Support'],
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Miguel Rodriguez',
      location: 'Barcelona, Spain',
      rating: 4.9,
      specialties: ['Architecture', 'History', 'Local Cuisine'],
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ],
  experiences: [
    {
      id: '1',
      title: 'Traditional Tea Ceremony',
      location: 'Kyoto, Japan',
      price: 45,
      duration: '2 hours',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      title: 'Flamenco Dance Workshop',
      location: 'Seville, Spain',
      price: 35,
      duration: '1.5 hours',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop'
    }
  ]
}

// Demo endpoints for development
app.get('/api/demo/companions', (req, res) => {
  res.json({ success: true, data: demoData.companions })
})

app.get('/api/demo/experiences', (req, res) => {
  res.json({ success: true, data: demoData.experiences })
})

// Demo auth endpoints for development
app.post('/api/demo/register', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Demo registration successful',
    data: {
      user: { id: 'demo-1', firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email },
      token: 'demo-token-123',
      refreshToken: 'demo-refresh-token-456'
    }
  })
})

app.post('/api/demo/login', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Demo login successful',
    data: {
      user: { id: 'demo-1', firstName: 'Demo', lastName: 'User', email: req.body.email },
      token: 'demo-token-123',
      refreshToken: 'demo-refresh-token-456'
    }
  })
})

// API Routes - only load if MongoDB is connected
let mongoConnected = false

// Start server
const startServer = async () => {
  try {
    mongoConnected = await connectDB()
    
    if (mongoConnected) {
      // Only load full API routes if MongoDB is connected
      app.use('/api/auth', authRoutes)
      app.use('/api/trips', tripRoutes)
      app.use('/api/companions', companionRoutes)
      app.use('/api/experiences', experienceRoutes)
      app.use('/api/users', userRoutes)
      console.log('🔌 Full API routes loaded')
    } else {
      console.log('🎭 Running in demo mode - using demo endpoints only')
    }

    // SOS Emergency endpoint
    app.post('/api/sos', (req, res) => {
      console.log('🚨 SOS Alert received:', req.body)
      res.status(200).json({
        message: 'SOS alert received. Emergency services have been notified.',
        timestamp: new Date().toISOString()
      })
    })

    // 404 handler
    app.use(notFound)

    // Error handler
    app.use(errorHandler)

    app.listen(PORT, () => {
      console.log(`🚀 Safe Travel Platform API running on port ${PORT}`)
      console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`🔗 Health check: http://localhost:${PORT}/health`)
      console.log(`🎭 Demo mode: ${!mongoConnected ? 'enabled' : 'disabled'}`)
      if (!mongoConnected) {
        console.log(`📋 Demo endpoints available:`)
        console.log(`   GET  /api/demo/companions`)
        console.log(`   GET  /api/demo/experiences`)
        console.log(`   POST /api/demo/register`)
        console.log(`   POST /api/demo/login`)
      }
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

export default app
