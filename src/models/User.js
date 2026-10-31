'use strict';
const { query } = require('../config/database');

class User {
  static async findById(id) {
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0] || null;
  }

  static async findByEmail(email) {
    const { rows } = await query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    return rows[0] || null;
  }

  static async create({ name, email, passwordHash, role = 'user' }) {
    const { rows } = await query(
      'INSERT INTO users (name, email, password_hash, role, created_at) VALUES ($1,$2,$3,$4,NOW()) RETURNING *',
      [name, email.toLowerCase(), passwordHash, role]
    );
    return rows[0];
  }

  static async updateLastLogin(id) {
    await query('UPDATE users SET last_login = NOW() WHERE id = $1', [id]);
  }
}

module.exports = User;
