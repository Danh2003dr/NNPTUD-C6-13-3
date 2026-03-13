var express = require('express');
var router = express.Router();
let userController = require('../controllers/users')
let { RegisterValidator, ChangePasswordValidator, handleResultValidator } = require('../utils/validatorHandler')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let { checkLogin } = require('../utils/authHandler')
let jwtKeys = require('../utils/jwtKeys')
/* GET home page. */
router.post('/register', RegisterValidator, handleResultValidator, async function (req, res, next) {
    let newUser = userController.CreateAnUser(
        req.body.username,
        req.body.password,
        req.body.email,
        "69aa8360450df994c1ce6c4c"
    );
    await newUser.save()
    res.send({
        message: "dang ki thanh cong"
    })
});
router.post('/login', async function (req, res, next) {
    let { username, password } = req.body;
    let getUser = await userController.FindByUsername(username);
    if (!getUser) {
        res.status(403).send("tai khoan khong ton tai")
    } else {
        if (getUser.lockTime && getUser.lockTime > Date.now()) {
            res.status(403).send("tai khoan dang bi ban");
            return;
        }
        if (bcrypt.compareSync(password, getUser.password)) {
            await userController.SuccessLogin(getUser);
            const privateKey = jwtKeys.getPrivateKey();
            let token = jwt.sign(
                { id: getUser._id },
                privateKey,
                { algorithm: 'RS256', expiresIn: '30d' }
            );
            res.send(token)
        } else {
            await userController.FailLogin(getUser);
            res.status(403).send("thong tin dang nhap khong dung")
        }
    }

});
router.get('/me', checkLogin, function (req, res, next) {
    res.send(req.user)
});

// Đổi mật khẩu (yêu cầu đăng nhập)
router.post('/changepassword', checkLogin, ChangePasswordValidator, handleResultValidator, async function (req, res, next) {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;
    if (!bcrypt.compareSync(oldPassword, user.password)) {
        return res.status(400).send('Mat khau cu khong dung');
    }
    user.password = newPassword;
    await user.save();
    res.send({ message: 'Doi mat khau thanh cong' });
});

module.exports = router;
