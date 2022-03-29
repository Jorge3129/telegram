"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_functions_1 = require("../db/db.functions");
class AuthController {
    async register(req, res) {
        const { username, password } = req.body;
        db_functions_1.users.push({ username, password, id: db_functions_1.users.length + 1 });
        res.send({ success: true });
    }
    async login(req, res) {
        const { username, password } = req.body;
        console.log('LOGIN!', username, password);
        const user = db_functions_1.users
            .find(u => u.username === username
            && u.password === password);
        if (user)
            res.json({ success: true, username });
        else
            res.status(403).json({ success: false });
    }
}
module.exports = new AuthController();
