const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employer.controller');
const managerController = require('../controllers/manager.controller');
const protect = require('../middleware/auth');
const role = require('../middleware/role');


// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Employer route OK ✅' });
});

// Protected routes
router.get('/dashboard-stats', protect, role('employer'), employerController.getDashboardStats);
router.get('/managers',/* protect, role('employer'),*/ employerController.getAllManagers);
router.post('/managers', protect, role('employer'), employerController.createManager);
router.delete('/managers/:id', protect, role('employer'), employerController.deleteManager);
router.put('/managers/:id', protect, role('employer'), employerController.updateManager);
router.post('/leads', protect, role('manager'), managerController.createLead);
router.post('/leads', protect, role('employer'), employerController.createLeadForManager);
router.get('/leads', protect, role('employer'), employerController.getAllLeads);



module.exports = router;
