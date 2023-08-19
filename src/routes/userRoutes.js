const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/index').User;
const { generateToken } = require('../utils/jwt');
const routerUser = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                    $ref: "#/components/schemas/user"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */

routerUser.post('/register', [
    body('username').not().isEmpty().trim().escape(),
    body('password').isLength({ min: 6 }).trim().escape()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt)
        const user = await User.create({ username, password: hashPass });
        const token = generateToken(user);
        
        res.status(201).json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
});

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                    $ref: "#/components/schemas/user"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */

routerUser.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
       const validPass = bcrypt.compareSync(password, user.password);

        if (!user || !validPass) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }

        const token = generateToken(user);

        res.status(200).json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
});

module.exports = routerUser;
