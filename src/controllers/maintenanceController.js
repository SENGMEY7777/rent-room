const maintenanceService = require('../services/maintenanceService');

const getAll = async (req, res, next) => {
    try {
        const data = await maintenanceService.findAll(req.query);
        return res.status(200).json({ success: true, count: data.length, data });
    } catch (error) {
        return next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const item = await maintenanceService.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Maintenance not found' });
        }
        return res.status(200).json({ success: true, data: item });
    } catch (error) {
        return next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const created = await maintenanceService.create(req.body);
        return res.status(201).json({ success: true, message: 'Maintenance created successfully', data: created });
    } catch (error) {
        return next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const updated = await maintenanceService.update(req.params.id, req.body);
        return res.status(200).json({ success: true, message: 'Maintenance updated successfully', data: updated });
    } catch (error) {
        return next(error);
    }
};

const deleteItem = async (req, res, next) => {
    try {
        await maintenanceService.delete(req.params.id);
        return res.status(200).json({ success: true, message: 'Maintenance deleted successfully' });
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
