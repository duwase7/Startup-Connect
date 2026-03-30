const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  tagline: {
    type: String,
    maxlength: [200, 'Tagline cannot be more than 200 characters']
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid website URL'
    ]
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number cannot be more than 20 characters']
  },
  industry: {
    type: String,
    required: [true, 'Please add an industry'],
    trim: true
  },
  stage: {
    type: String,
    enum: ['idea', 'prototype', 'seed', 'growth', 'scale'],
    default: 'seed'
  },
  fundingStage: {
    type: String,
    enum: ['pre-seed', 'seed', 'series-a', 'series-b', 'series-c', 'late-stage'],
    default: 'seed'
  },
  fundingAmount: {
    type: Number,
    default: 0
  },
  teamSize: {
    type: String,
    enum: ['1-5', '6-15', '16-50', '51-200', '200+'],
    default: '1-5'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    city: String,
    state: String,
    country: String
  },
  logo: {
    type: String,
    default: null
  },
  images: [{
    type: String
  }],
  tags: [{
    type: String,
    trim: true
  }],
  socialLinks: {
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String
  },
  team: [{
    name: String,
    role: String,
    bio: String,
    avatar: String
  }],
  milestones: [{
    title: String,
    description: String,
    date: Date,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  products: [{
    name: String,
    description: String,
    launchDate: Date,
    status: {
      type: String,
      enum: ['development', 'beta', 'launched', 'discontinued'],
      default: 'development'
    }
  }],
  investors: [{
    name: String,
    type: String, // angel, vc, corporate
    amount: Number,
    date: Date
  }],
  collaborators: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    role: String,
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for search optimization
startupSchema.index({ name: 'text', description: 'text', industry: 'text' });
startupSchema.index({ location: '2dsphere' });
startupSchema.index({ industry: 1, stage: 1 });
startupSchema.index({ createdAt: -1 });

// Virtual for full address
startupSchema.virtual('fullAddress').get(function() {
  return this.location.formattedAddress;
});

// Method to increment views
startupSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Static method to find startups by location
startupSchema.statics.findByLocation = function(coordinates, maxDistance) {
  return this.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: coordinates
        },
        $maxDistance: maxDistance || 50000 // default 50km
      }
    }
  });
};

module.exports = mongoose.model('Startup', startupSchema);