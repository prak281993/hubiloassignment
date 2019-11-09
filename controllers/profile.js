const User = require('../models/User');

exports.getAllUsers = (req, res, next) => {
    console.log(req.user);
    User.find()
        .select('name email device_token device_type')
        .then(users => {
            if (!users) {
                return res.status(400).json({ message: 'Users not found' });
            }
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

exports.getUser = (req, res, next) => {
    const { email } = req.params;
    User.findOne({ email: email })
        .select('name email device_token device_type')
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

exports.updateUser = (req, res, next) => {
    const { name, device_token, device_type } = req.body;
    const { email } = req.user;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
            return User.updateOne({ email: email }, {
                name: name || user.name,
                device_token: device_token || user.device_token,
                device_type: device_type || user.device_type
            })
        })
        .then(user => {
            if (user.nModified === 0) {
                return res.status(200).json({ message: 'User not modified' })
            }
            return User.findOne({ email: email }).select('name email device_token device_type');
        })
        .then(user => {
            res.status(200).json({
                message: 'User profile successfully updated',
                user
            })
        })
        .catch(err => {
            res.status(500).json(err);
        })

}