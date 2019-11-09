const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const isAuth = require('../middlewares/isAuth')

// protected route
router.get('/getallusers', isAuth, profileController.getAllUsers);

//protected route
router.get('/getuser/:email', isAuth, profileController.getUser);

//protected route
router.post('/updateuser', isAuth, profileController.updateUser);


module.exports = router;