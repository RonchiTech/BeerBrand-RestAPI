const express = require('express');

const router = express.Router();

router.route('/login/google').get();
router.route('/login/auth/google/callback').get();
module.exports = router