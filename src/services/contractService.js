const db = require('../configs/db');
const ContractModel = require('../models/contractModel');
const RoomModel = require('../models/roomModel');

class ContractService {
  static async createContract(contractData) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      const contractId = await ContractModel.create(contractData, connection);
      await RoomModel.updateStatus(contractData.room_id, 'occupied', connection);
      await connection.commit();
      return { id: contractId, ...contractData, status: 'active' };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = ContractService;