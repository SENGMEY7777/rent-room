const crypto = require('crypto');
const tenantModel = require('../models/tenantModel');

const findAll = async (filters) => {
    return tenantModel.findAll(filters);
};

const findById = async (id) => {
    return tenantModel.findById(id);
};

const create = async (payload) => {
    const id = 'ten_' + crypto.randomUUID().slice(0, 8);
    return tenantModel.create({ id, ...payload });
};

const update = async (id, payload) => {
    const existing = await tenantModel.findById(id);
    if (!existing) {
        const error = new Error('Tenant not found');
        error.status = 404;
        throw error;
    }
    return tenantModel.update(id, payload);
};

const deleteItem = async (id) => {
    return tenantModel.delete(id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteItem,
};
