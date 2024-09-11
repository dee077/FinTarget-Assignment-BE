const express = require('express');
const taskController = require('../controllers/taskController');
const rateLimitMiddleware = require('../middlewares/rateLimiterMiddleware');


const router = express.Router();

// POST route for processing tasks
router.post('/task', rateLimitMiddleware, taskController.processTask);

module.exports = router;
