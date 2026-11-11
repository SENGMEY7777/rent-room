const roomService = require('../services/roomService');

const getAll = async (req, res, next) => {
    try {
        const data = await roomService.findAll(req.query);
        return res.status(200).json({ success: true, count: data.length, data });
    } catch (error) {
        return next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const item = await roomService.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }
        return res.status(200).json({ success: true, data: item });
    } catch (error) {
        return next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const created = await roomService.create(req.body);
        return res.status(201).json({ success: true, message: 'Room created successfully', data: created });
    } catch (error) {
        return next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const updated = await roomService.update(req.params.id, req.body);
        return res.status(200).json({ success: true, message: 'Room updated successfully', data: updated });
    } catch (error) {
        return next(error);
    }
};

const deleteItem = async (req, res, next) => {
    try {
        await roomService.delete(req.params.id);
        return res.status(200).json({ success: true, message: 'Room deleted successfully' });
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
