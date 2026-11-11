const crypto = require('crypto');
const utilityModel = require('../models/utilityModel');

const findAll = async (filters) => {
    return utilityModel.findAll(filters);
};

const findById = async (id) => {
    return utilityModel.findById(id);
};

const create = async (payload) => {
    const id = 'uti_' + crypto.randomUUID().slice(0, 8);
    return utilityModel.create({ id, ...payload });
};

const update = async (id, payload) => {
    const existing = await utilityModel.findById(id);
    if (!existing) {
        const error = new Error('Utility not found');
        error.status = 404;
        throw error;
    }
    return utilityModel.update(id, payload);
};

const deleteItem = async (id) => {
    return utilityModel.delete(id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteItem,
};
