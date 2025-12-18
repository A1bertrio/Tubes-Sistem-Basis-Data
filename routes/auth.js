const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username } = req.body;

  if (username === 'adminA') req.session.role = 'admin';
  else if (username === 'petugasB') req.session.role = 'petugas';
  else if (username === 'anggotaC') {
    req.session.role = 'anggota';
    req.session.nim = 'A001';
  }
  else return res.status(401).json({ message: 'User tidak valid' });

  res.json({ role: req.session.role });
});

router.get('/me', (req, res) => {
  res.json({ role: req.session.role });
});

module.exports = router;
