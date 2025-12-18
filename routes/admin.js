const express = require('express');
const router = express.Router();
const getDB = require('../db');
const allow = require('../middleware/rbac');

const MAX_LIMIT = 1000;

router.get('/anggota', allow('admin'), async (req, res) => {
  const db = await getDB('admin');
  let limit = parseInt(req.query.limit) || 10;
  let page = parseInt(req.query.page) || 1;

  if (limit > MAX_LIMIT) limit = MAX_LIMIT;
  const offset = (page - 1) * limit;

  const [rows] = await db.query(`
    SELECT nim, nama, email, no_hp, alamat
    FROM Anggota
    LIMIT ? OFFSET ?
  `, [limit, offset]);

  res.json({
    data: rows,
    limit,
    page,
    note: `Menampilkan maksimal ${limit} data`
  });
});

module.exports = router;
