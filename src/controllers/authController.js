const AuthService = require('../services/authService');

class AuthController {
  static async register(req, res, next) {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async me(req, res, next) {
    try {
      res.status(200).json({ success: true, data: req.user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;