const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager.controller');
const protect = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/leads',protect, role('manager'), managerController.getManagerLeads);

module.exports = router;
