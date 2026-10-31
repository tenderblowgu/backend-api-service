'use strict';
const productService = require('../services/productService');

async function list(req, res, next) {
  try {
    const { limit, offset, category } = req.query;
    const products = await productService.listProducts({ limit: +limit || 20, offset: +offset || 0, category });
    res.json({ products, count: products.length });
  } catch (err) { next(err); }
}

async function get(req, res, next) {
  try {
    const product = await productService.getProduct(+req.params.id);
    res.json(product);
  } catch (err) { next(err); }
}

async function checkout(req, res, next) {
  try {
    const session = await productService.createCheckoutSession(+req.params.id, req.user.sub);
    res.json({ url: session.url });
  } catch (err) { next(err); }
}

module.exports = { list, get, checkout };
