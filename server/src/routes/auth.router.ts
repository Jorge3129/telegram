import {Router} from "express";
import express = require("express");

const authController = require('../controllers/auth.controller')

const router: Router = express.Router();

router.post('/login', authController.login)
router.post('/register', authController.register)

module.exports = router;
