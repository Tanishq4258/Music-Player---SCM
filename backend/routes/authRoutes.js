const express = require('express');
const router = express.Router();

// Example route (replace with your actual controller logic)
router.get('/test', (req, res) => {
  res.send('Auth route working!');
});

module.exports = router;
