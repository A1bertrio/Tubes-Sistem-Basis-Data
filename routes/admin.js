// routes/admin.js
const express = require('express');
const router = express.Router();
const getDB = require('../db');
const allow = require('../middleware/rbac');

const ITEMS_PER_PAGE = 10;
const ALLOWED_SORT_FIELDS = ['nim', 'nama', 'email', 'no_hp', 'alamat'];

router.get('/anggota', allow('admin'), async (req, res) => {
  const db = await getDB('admin');

  // Parameter dari query string
  let page = parseInt(req.query.page) || 1;
  const search = req.query.search || '';
  let sortBy = req.query.sortBy || 'nim';
  let order = (req.query.order === 'desc') ? 'DESC' : 'ASC';

  if (page < 1) page = 1;
  if (!ALLOWED_SORT_FIELDS.includes(sortBy)) sortBy = 'nim';

  const offset = (page - 1) * ITEMS_PER_PAGE;

  // Bangun query dinamis
  let query = `
    SELECT nim, nama, email, no_hp, alamat
    FROM Anggota
  `;
  const params = [];

  // Tambahkan klausa WHERE jika ada pencarian
  if (search) {
    query += ` WHERE nim LIKE ? OR nama LIKE ? OR email LIKE ? OR alamat LIKE ?`;
    const like = `%${search}%`;
    params.push(like, like, like, like);
  }

  // Tambahkan ORDER BY dan LIMIT
  query += ` ORDER BY ?? ${order} LIMIT ? OFFSET ?`;
  params.push(sortBy, ITEMS_PER_PAGE, offset);

  // Eksekusi query data
  const [rows] = await db.query(query, params);

  // Hitung total data (untuk pagination) — gunakan query yang sama tanpa LIMIT
  let countQuery = `SELECT COUNT(*) AS total FROM Anggota`;
  let countParams = [];
  if (search) {
    countQuery += ` WHERE nim LIKE ? OR nama LIKE ? OR email LIKE ? OR alamat LIKE ?`;
    const like = `%${search}%`;
    countParams = [like, like, like, like];
  }
  const [countResult] = await db.query(countQuery, countParams);
  const total = countResult[0].total;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  res.json({
    data: rows,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: ITEMS_PER_PAGE
    },
    search,
    sort: { sortBy, order }
  });
});

module.exports = router;