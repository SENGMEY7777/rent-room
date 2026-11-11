const db = require('../configs/db');

const findAll = async (filters = {}) => {
    const [rows] = await db.execute('SELECT * FROM maintenances ORDER BY created_at DESC');
    return rows;
};

const findById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM maintenances WHERE id = ?', [id]);
    return rows[0] || null;
};

const create = async (payload) => {
    const keys = Object.keys(payload);
    const values = Object.values(payload);
    const placeholders = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO maintenances (${keys.join(', ')}) VALUES (${placeholders})`;
    await db.execute(sql, values);
    return payload;
};

const update = async (id, payload) => {
    const keys = Object.keys(payload);
    const values = Object.values(payload);
    const setClause = keys.map((key) => `${key} = ?`).join(', ');
    const sql = `UPDATE maintenances SET ${setClause} WHERE id = ?`;
    await db.execute(sql, [...values, id]);
    return { id, ...payload };
};

const deleteRecord = async (id) => {
    const [result] = await db.execute('DELETE FROM maintenances WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteRecord,
};
