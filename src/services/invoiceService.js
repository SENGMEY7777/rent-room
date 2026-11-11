const crypto = require('crypto');
const invoiceModel = require('../models/invoiceModel');

const findAll = async (filters) => {
    return invoiceModel.findAll(filters);
};

const findById = async (id) => {
    return invoiceModel.findById(id);
};

const create = async (payload) => {
    const id = 'inv_' + crypto.randomUUID().slice(0, 8);
    return invoiceModel.create({ id, ...payload });
};

const update = async (id, payload) => {
    const existing = await invoiceModel.findById(id);
    if (!existing) {
        const error = new Error('Invoice not found');
        error.status = 404;
        throw error;
    }
    return invoiceModel.update(id, payload);
};

const deleteItem = async (id) => {
    return invoiceModel.delete(id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteItem,
};
