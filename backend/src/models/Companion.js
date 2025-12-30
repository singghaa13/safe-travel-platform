import mongoose from 'mongoose'

const companionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  languages: [{
    type: String,
    required: true
  }],
  specialties: [{
    type: String
  }],
  hourlyRate: {
    type: Number,
    required: true,
    min: 0
  },
  availability: {
    type: String,
    enum: ['available', 'busy', 'unavailable'],
    default: 'available'
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  documents: [{
    type: String,
    description: String
  }],
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
  profileImage: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.model('Companion', companionSchema)
