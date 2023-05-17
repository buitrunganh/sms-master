const userService = require('../service/user');

class UserController {
    async createUser(req, res) {
        try {
            const id = await userService.createUser(req.body);
            res.status(201).json(id);
        } catch (err) {
            console.error(err);
            res.status(500).json(err)
        }
    }
}

module.exports = new UserController();