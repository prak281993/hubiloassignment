const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res, next) => {
    const { name, email, password, confirmPassword, device_token, device_type } = req.body;
    let hashedPassword;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }
            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' })
            }
            return bcrypt.hash(password, 12);
        })
        .then(hashPass => {
            hashedPassword = hashPass;
            const newUser = {
                name,
                email,
                password: hashedPassword,
                device_token,
                device_type
            };

            return User.create(newUser);
        })
        .then(user => {
            res.status(200).json({ message: 'User created successfully' });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
}

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    let authUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }
            authUser = user;
            return bcrypt.compare(password, user.password)
        })
        .then(isMatch => {
            if (!isMatch) {
                return res.status(400).json({ message: 'Password incorrect' });
            }
            const payload = {
                _id: authUser._id,
                name: authUser.name,
                email: authUser.email
            };

            jwt.sign(payload,
                'secret',
                { expiresIn: 7200 },
                (error, token) => {
                    if (error) {
                        return res.json(error)
                    }
                    res.status(200).json({ token })
                })
        })
        .catch(err => {
            res.status(500).json(err);
        })
}
