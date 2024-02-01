const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const subscriptionCheck = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;
    if (user && user.subscription) {
      // User has an active subscription
      next();
    } else {
      res.status(403);
      throw new Error('Subscription required');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Internal Server Error');
  }
});

module.exports = { subscriptionCheck };
