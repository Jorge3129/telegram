import {Request, Response} from "express";
import {users} from "../db/users";
import {IUser} from "../types/types";

class AuthController {
    async register(req: Request, res: Response) {
        const {username, password} = req.body;
        users.push({username, password});
        res.send({success: true});
    }

    async login(req: Request, res: Response) {
        const {username, password} = req.body;
        console.log('LOGIN!', username, password)
        const user: IUser | undefined = users
            .find(u => u.username === username
                && u.password === password);
        if(user) res.json({success: true, username});
        else res.status(403).json({success: false});
    }
}

module.exports = new AuthController()
