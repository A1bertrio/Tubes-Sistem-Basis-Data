// routes/admin.js
const express = require('express');
const router = express.Router();
const getDB = require('../db');
const allow = require('../middleware/rbac');

const ITEMS_PER_PAGE = 10;

router.get('/anggota', allow('admin'), async (req, res) => {
  const db = await getDB('admin');
  let page = parseInt(req.query.page) || 1;
  if (page < 1) page = 1;

  const offset = (page - 1) * ITEMS_PER_PAGE;

  // Ambil data anggota
  const [rows] = await db.query(`
    SELECT nim, nama, email, no_hp, alamat
    FROM Anggota
    LIMIT ? OFFSET ?
  `, [ITEMS_PER_PAGE, offset]);

  // Hitung total
  const [countResult] = await db.query('SELECT COUNT(*) AS total FROM Anggota');
  const total = countResult[0].total;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  res.json({
    data: rows,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: ITEMS_PER_PAGE
    }
  });
});

module.exports = router;