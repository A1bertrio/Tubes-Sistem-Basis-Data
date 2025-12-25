// routes/admin-nonpaginated.js
const express = require('express');
const router = express.Router();
const getDB = require('../db');
const allow = require('../middleware/rbac');

// Endpoint untuk stress test — TANPA LIMIT
router.get('/nonpaginated', allow('admin'), async (req, res) => {
  const db = await getDB('admin');
  
  // Gunakan SQL_NO_CACHE untuk hindari cache MySQL
  // Tambahkan kolom berat untuk simulasi payload besar
  const [rows] = await db.query(`
    SELECT nim, nama, email, no_hp, alamat
    FROM Anggota
    ORDER BY nim
  `);
  
  res.json({ data: rows, total: rows.length });
});

module.exports = router;