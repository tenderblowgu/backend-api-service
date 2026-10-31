'use strict';
const Product = require('../models/Product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function listProducts(filters) {
  return Product.findAll(filters);
}

async function getProduct(id) {
  const p = await Product.findById(id);
  if (!p) { const err = new Error('Product not found'); err.status = 404; throw err; }
  return p;
}

async function createCheckoutSession(productId, userId) {
  const product = await getProduct(productId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price_data: { currency: 'usd', product_data: { name: product.name }, unit_amount: Math.round(product.price * 100) }, quantity: 1 }],
    mode: 'payment',
    success_url: `${process.env.APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/checkout/cancel`,
    metadata: { productId: String(productId), userId: String(userId) },
  });
  return session;
}

module.exports = { listProducts, getProduct, createCheckoutSession };
