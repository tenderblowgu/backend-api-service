'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret, jwtExpiresIn, bcryptRounds } = require('../config');

async function register({ name, email, password }) {
  const existing = await User.findByEmail(email);
  if (existing) {
    const err = new Error('Email already registered'); err.status = 409; throw err;
  }
  const passwordHash = await bcrypt.hash(password, bcryptRounds);
  const user = await User.create({ name, email, passwordHash });
  const token = signToken(user);
  return { user: sanitize(user), token };
}

async function login({ email, password }) {
  const user = await User.findByEmail(email);
  if (!user) {
    const err = new Error('Invalid credentials'); err.status = 401; throw err;
  }
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    const err = new Error('Invalid credentials'); err.status = 401; throw err;
  }
  await User.updateLastLogin(user.id);
  return { user: sanitize(user), token: signToken(user) };
}

function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
}

function sanitize({ id, name, email, role, created_at, last_login }) {
  return { id, name, email, role, created_at, last_login };
}

module.exports = { register, login };
