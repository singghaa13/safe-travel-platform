import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['cultural', 'adventure', 'food', 'nature', 'historical', 'art', 'other']
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  maxParticipants: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  images: [{
    type: String
  }],
  includedItems: [{
    type: String
  }],
  requirements: [{
    type: String
  }],
  safetyNotes: {
    type: String
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  availability: {
    type: String,
    enum: ['available', 'limited', 'unavailable'],
    default: 'available'
  }
}, {
  timestamps: true
})

export default mongoose.model('Experience', experienceSchema)
