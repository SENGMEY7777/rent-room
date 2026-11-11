const db = require('../configs/db');

class ContractModel {
  static async create(data, connection = db) {
    const { room_id, tenant_id, start_date, end_date, monthly_rent, deposit_paid } = data;
    const [result] = await connection.execute(
      'INSERT INTO contracts (room_id, tenant_id, start_date, end_date, monthly_rent, deposit_paid, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [room_id, tenant_id, start_date, end_date, monthly_rent, deposit_paid, 'active']
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM contracts');
    return rows;
  }

  static async terminate(id, connection = db) {
    await connection.execute('UPDATE contracts SET status = ? WHERE id = ?', ['terminated', id]);
  }
}

module.exports = ContractModel;