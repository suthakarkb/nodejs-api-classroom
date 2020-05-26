const express = require('express');
const router = express.Router();
const path = require('path');


//user routes
router.use('/api/users', require('../service/users').router);
router.use('/api/user', require('../service/user').router);
router.use('/api/user/create', require('../service/createUser').router);
router.use('/api/user/update', require('../service/updateUser').router);

//admin routes
router.use('/api/register', require('../service/register').router);
router.use('/api/commonstudents', require('../service/commonstudents').router);
router.use('/api/suspend', require('../service/suspend').router);
router.use('/api/retrievefornotifications', require('../service/retrievefornotifications').router);

// application -------------------------------------------------------------
router.get('/', function (req, res) {
	res.status(200).json({ message: "Welcome to nodeJS  API"})
});

router.get('/form', function (req, res) {
	var fileName = '/../public/form.html';
	res.sendFile(path.join(__dirname+fileName));
});

module.exports = router;