const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Languages', 'Tools'],
    trim: true,
  },
  topics: {
    type: [String],
    default: [],
  },
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;