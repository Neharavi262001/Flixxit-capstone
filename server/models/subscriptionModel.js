const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
