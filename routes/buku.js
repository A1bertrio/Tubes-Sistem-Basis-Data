const express = require('express');
const router = express.Router();
const getDB = require('../db');
const allow = require('../middleware/rbac');

router.get('/all', allow('anggota'), async (req, res) => {
  const db = await getDB('anggota');
  const [rows] = await db.query('SELECT * FROM Buku LIMIT 100');
  res.json(rows);
});

module.exports = router;
