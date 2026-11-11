const invoiceService = require('../services/invoiceService');

const getAll = async (req, res, next) => {
    try {
        const data = await invoiceService.findAll(req.query);
        return res.status(200).json({ success: true, count: data.length, data });
    } catch (error) {
        return next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const item = await invoiceService.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }
        return res.status(200).json({ success: true, data: item });
    } catch (error) {
        return next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const created = await invoiceService.create(req.body);
        return res.status(201).json({ success: true, message: 'Invoice created successfully', data: created });
    } catch (error) {
        return next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const updated = await invoiceService.update(req.params.id, req.body);
        return res.status(200).json({ success: true, message: 'Invoice updated successfully', data: updated });
    } catch (error) {
        return next(error);
    }
};

const deleteItem = async (req, res, next) => {
    try {
        await invoiceService.delete(req.params.id);
        return res.status(200).json({ success: true, message: 'Invoice deleted successfully' });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteItem,
};
