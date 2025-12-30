import mongoose from 'mongoose'

const tripSchema = new mongoose.Schema({
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
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    min: 0
  },
  companions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Companion'
  }],
  experiences: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience'
  }],
  status: {
    type: String,
    enum: ['planning', 'active', 'completed', 'cancelled'],
    default: 'planning'
  },
  safetyPreferences: {
    emergencyContacts: [{
      name: String,
      phone: String,
      relationship: String
    }],
    locationSharing: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
})

export default mongoose.model('Trip', tripSchema)
