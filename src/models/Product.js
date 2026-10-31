'use strict';
const { query } = require('../config/database');

class Product {
  static async findAll({ limit = 20, offset = 0, category } = {}) {
    const params = [limit, offset];
    let sql = 'SELECT * FROM products WHERE active = true';
    if (category) { sql += ' AND category = $3'; params.push(category); }
    sql += ' ORDER BY created_at DESC LIMIT $1 OFFSET $2';
    const { rows } = await query(sql, params);
    return rows;
  }

  static async findById(id) {
    const { rows } = await query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0] || null;
  }

  static async create(data) {
    const { name, description, price, category, stock } = data;
    const { rows } = await query(
      'INSERT INTO products (name,description,price,category,stock,active,created_at) VALUES ($1,$2,$3,$4,$5,true,NOW()) RETURNING *',
      [name, description, price, category, stock]
    );
    return rows[0];
  }
}

module.exports = Product;
