const express = require('express');
const taskController = require('../controllers/taskController');
const rateLimitMiddleware = require('../middlewares/rateLimiterMiddleware');


const router = express.Router();

router.post('/task', rateLimitMiddleware, taskController);

module.exports = router;
