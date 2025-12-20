// routes/buku.js
const express = require('express');
const router = express.Router();
const getDB = require('../db');
const allow = require('../middleware/rbac');

// Hanya anggota yang boleh akses
router.get('/all', allow('anggota'), async (req, res) => {
  const db = await getDB('anggota');
  // Ambil SEMUA buku — tanpa LIMIT
  const [rows] = await db.query(`
    SELECT judul, pengarang, tahun, isbn
    FROM Buku
    ORDER BY judul
  `);
  res.json(rows);
});

module.exports = router;