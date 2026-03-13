let jwt = require('jsonwebtoken')
let userController = require('../controllers/users')
let jwtKeys = require('./jwtKeys')

module.exports = {
    checkLogin: async function (req, res, next) {
        let token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer")) {
            return res.status(403).send("ban chua dang nhap");
        }
        token = token.split(" ")[1];
        try {
            const publicKey = jwtKeys.getPublicKey();
            let result = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
            let user = await userController.FindById(result.id);
            if (!user) {
                return res.status(403).send("ban chua dang nhap");
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(403).send("ban chua dang nhap");
        }
    }
}