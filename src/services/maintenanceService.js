const crypto = require('crypto');
const maintenanceModel = require('../models/maintenanceModel');

const findAll = async (filters) => {
    return maintenanceModel.findAll(filters);
};

const findById = async (id) => {
    return maintenanceModel.findById(id);
};

const create = async (payload) => {
    const id = 'mai_' + crypto.randomUUID().slice(0, 8);
    return maintenanceModel.create({ id, ...payload });
};

const update = async (id, payload) => {
    const existing = await maintenanceModel.findById(id);
    if (!existing) {
        const error = new Error('Maintenance not found');
        error.status = 404;
        throw error;
    }
    return maintenanceModel.update(id, payload);
};

const deleteItem = async (id) => {
    return maintenanceModel.delete(id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteItem,
};
