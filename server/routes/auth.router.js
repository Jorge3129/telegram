"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authController = require('../controllers/auth.controller');
const router = express.Router();
router.post('/login', authController.login);
router.post('/register', authController.register);
module.exports = router;
