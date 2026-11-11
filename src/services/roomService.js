const crypto = require('crypto');
const roomModel = require('../models/roomModel');

const findAll = async (filters) => {
    return roomModel.findAll(filters);
};

const findById = async (id) => {
    return roomModel.findById(id);
};

const create = async (payload) => {
    const id = 'roo_' + crypto.randomUUID().slice(0, 8);
    return roomModel.create({ id, ...payload });
};

const update = async (id, payload) => {
    const existing = await roomModel.findById(id);
    if (!existing) {
        const error = new Error('Room not found');
        error.status = 404;
        throw error;
    }
    return roomModel.update(id, payload);
};

const deleteItem = async (id) => {
    return roomModel.delete(id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteItem,
};
