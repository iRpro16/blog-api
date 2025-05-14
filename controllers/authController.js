const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const authService = require("../services/authService");
const jwt = require("jsonwebtoken");


async function postCreateUser(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await authService.createUser(
            req.body.name,
            req.body.email,
            hashedPassword
        );

        res.status(201).json({ message: "User created successfully" });
    } catch(err) {
        console.error(err);
        next(err);
    }
}

async function postUserLogin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await authService.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid password" });
        }

        jwt.sign({user}, 'secretkey', { expiresIn: '1h' }, (err, token) => {
            res.json({
                token
            });
        });
    } catch(err) {
        console.error(err);
        res.status(401).json({ message: "User unauthorized" });
    }
}

module.exports = {
    postCreateUser,
    postUserLogin
}