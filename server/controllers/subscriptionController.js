const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Subscription = require('../models/subscriptionModel');
const {stripe}=require('../utils/stripe')

const viewAvailableSubscriptions = asyncHandler(async (req, res) => {
  try {
    // Fetch all prices with associated product information
    const pricesWithProducts = await stripe.prices.list({ expand: ['data.product'] });

    

    // Process the prices with product names or return them as needed
    const formattedPrices = pricesWithProducts.data.map(price => ({
      id: price.id,
      productName: price.product.name,
      amount: price.unit_amount / 100, // Convert amount to a readable format (assuming the amount is in cents)
      currency: price.currency,
      interval: price.recurring ? price.recurring.interval : null,
    }));

    // Send the formatted prices as a JSON response
    res.json(formattedPrices);

  } catch (error) {
    // Handle any errors that may occur during the API request
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const checkoutSession = asyncHandler(async (req, res) => {
  try {
     // Check if the user is authenticated
     if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const user = await User.findById(req.user);

     // Check if the user exists
     if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const session = await stripe.checkout.sessions.create({
      //billing_address_collection: 'auto',
      payment_method_types: ['card'], 
      line_items: [
        {
          price: req.body.id, 
          quantity: 1,
        },
      ],

      mode: 'subscription',
      success_url: 'http://localhost:3000', 
      cancel_url: 'http://localhost:3000/subscribe', 
      
      customer:user.stripeCustomerId
      
    });
    //console.log(user.stripeCustomerId)
  
    res.json({ sessionId: session.id, session,checkoutUrl: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error',stripeError: error.message  });
  }
});

















const subscribeToPlan = asyncHandler(async (req, res) => {
  const { userId, planId } = req.body;

  try {
    const user = await User.findById(userId);
    const subscriptionPlan = await Subscription.findById(planId);

    if (!user || !subscriptionPlan) {
      res.status(404);
      throw new Error('User or Subscription Plan not found');
    }

    // Assign the subscription plan to the user
    user.subscription = subscriptionPlan._id;
    await user.save();

    res.json({ message: 'Subscription successful', user });
  } catch (error) {
    res.status(500);
    throw new Error('Internal Server Error');
  }
});

const viewUserSubscriptionDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate('subscription');
    if (user) {
      res.json({ subscription: user.subscription });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500);
    throw new Error('Internal Server Error');
  }
});

module.exports = { viewAvailableSubscriptions,checkoutSession, subscribeToPlan, viewUserSubscriptionDetails };
