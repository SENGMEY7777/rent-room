const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModal = require('../models/userModel');
const env = require('../configs/env');

class AuthService {
  static async register(userData) {
    const existing = await UserModal.findByEmail(userData.email);
    if (existing) {
      throw Object.assign(new Error('Email already registered'), { statusCode: 400 });
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userId = await UserModal.create({ ...userData, password: hashedPassword });
    return { id: userId, name: userData.name, email: userData.email, role: userData.role || 'tenant' };
  }

  static async login(email, password) {
    const user = await UserModal.findByEmail(email);
    if (!user) {
      throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }
}

module.exports = AuthService;