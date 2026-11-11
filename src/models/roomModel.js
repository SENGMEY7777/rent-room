const db = require('../configs/db');

class RoomModel {
  static async create(data) {
    const { room_number, floor, room_type, price_per_month, deposit_amount, status, description } = data;
    const [result] = await db.execute(
      'INSERT INTO rooms (room_number, floor, room_type, price_per_month, deposit_amount, status, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [room_number, floor, room_type, price_per_month, deposit_amount, status || 'available', description]
    );
    return result.insertId;
  }

  static async findAll(status) {
    let query = 'SELECT * FROM rooms';
    let params = [];
    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM rooms WHERE id = ?', [id]);
    return rows[0];
  }

  static async updateStatus(id, status, connection = db) {
    await connection.execute('UPDATE rooms SET status = ? WHERE id = ?', [status, id]);
  }
}

module.exports = RoomModel;