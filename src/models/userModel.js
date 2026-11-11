const db = require('../configs/db');

class UserModal {
  static async create({ name, email, password, role, phone }) {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, role, phone]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT id, name, email, role, phone, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = UserModal;