const express = require('express');
const router = express.Router();
const getDB = require('../db');
const allow = require('../middleware/rbac');

router.get('/all', allow('petugas'), async (req, res) => {
  const db = await getDB('petugas');
  const [rows] = await db.query(`
    SELECT p.id_pinjam, a.nama, p.tgl_pinjam
    FROM Peminjaman p
    JOIN Anggota a ON p.nim = a.nim
    LIMIT 100
  `);
  res.json(rows);
});

module.exports = router;
