const Joi = require('joi');

// Register validation schema
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.min': 'Name must be at least 2 characters long',
        'string.max': 'Name cannot exceed 50 characters',
        'any.required': 'Name is required'
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .min(6)
      .required()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
      .messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'any.required': 'Password is required'
      }),
    role: Joi.string()
      .valid('user', 'startup', 'investor', 'mentor', 'admin')
      .default('user'),
    bio: Joi.string()
      .max(500)
      .optional(),
    skills: Joi.array()
      .items(Joi.string())
      .optional(),
    interests: Joi.array()
      .items(Joi.string())
      .optional()
  });

  return schema.validate(data);
};

// Login validation schema
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  });

  return schema.validate(data);
};

// Startup validation schema
const startupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'Startup name must be at least 2 characters long',
        'string.max': 'Startup name cannot exceed 100 characters',
        'any.required': 'Startup name is required'
      }),
    description: Joi.string()
      .min(10)
      .max(2000)
      .required()
      .messages({
        'string.min': 'Description must be at least 10 characters long',
        'string.max': 'Description cannot exceed 2000 characters',
        'any.required': 'Description is required'
      }),
    tagline: Joi.string()
      .max(200)
      .optional(),
    website: Joi.string()
      .uri()
      .optional()
      .messages({
        'string.uri': 'Please provide a valid website URL'
      }),
    email: Joi.string()
      .email()
      .optional()
      .messages({
        'string.email': 'Please provide a valid email address'
      }),
    phone: Joi.string()
      .pattern(/^[0-9+\-\s()]{7,20}$/)
      .optional()
      .messages({
        'string.pattern.base': 'Please provide a valid phone number'
      }),
    industry: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.min': 'Industry must be at least 2 characters long',
        'string.max': 'Industry cannot exceed 50 characters',
        'any.required': 'Industry is required'
      }),
    stage: Joi.string()
      .valid('idea', 'prototype', 'seed', 'growth', 'scale')
      .default('seed'),
    fundingStage: Joi.string()
      .valid('pre-seed', 'seed', 'series-a', 'series-b', 'series-c', 'late-stage')
      .default('seed'),
    fundingAmount: Joi.number()
      .min(0)
      .default(0),
    teamSize: Joi.string()
      .valid('1-5', '6-15', '16-50', '51-200', '200+')
      .default('1-5'),
    location: Joi.object({
      coordinates: Joi.array().items(Joi.number()).length(2),
      formattedAddress: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string()
    }).optional(),
    tags: Joi.array()
      .items(Joi.string())
      .optional(),
    socialLinks: Joi.object({
      linkedin: Joi.string().uri().optional(),
      twitter: Joi.string().uri().optional(),
      facebook: Joi.string().uri().optional(),
      instagram: Joi.string().uri().optional()
    }).optional(),
    team: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        role: Joi.string().required(),
        bio: Joi.string().optional(),
        avatar: Joi.string().uri().optional()
      })
    ).optional(),
    milestones: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        description: Joi.string().optional(),
        date: Joi.date().optional(),
        completed: Joi.boolean().default(false)
      })
    ).optional(),
    products: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        description: Joi.string().optional(),
        launchDate: Joi.date().optional(),
        status: Joi.string().valid('development', 'beta', 'launched', 'discontinued').default('development')
      })
    ).optional()
  });

  return schema.validate(data);
};

// Connection validation schema
const connectionValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string()
      .required()
      .messages({
        'any.required': 'User ID is required'
      }),
    message: Joi.string()
      .max(500)
      .optional()
      .messages({
        'string.max': 'Message cannot exceed 500 characters'
      })
  });

  return schema.validate(data);
};

// Message validation schema
const messageValidation = (data) => {
  const schema = Joi.object({
    recipientId: Joi.string()
      .required()
      .messages({
        'any.required': 'Recipient ID is required'
      }),
    content: Joi.string()
      .min(1)
      .max(2000)
      .required()
      .messages({
        'string.min': 'Message cannot be empty',
        'string.max': 'Message cannot exceed 2000 characters',
        'any.required': 'Message content is required'
      }),
    type: Joi.string()
      .valid('text', 'image', 'file')
      .default('text')
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  startupValidation,
  connectionValidation,
  messageValidation
};