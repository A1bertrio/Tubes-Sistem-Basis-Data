const mysql = require('mysql2/promise');

const users = {
  admin: { user: 'admin', password: 'admin123' },
  petugas: { user: 'petugas', password: 'petugas123' },
  anggota: { user: 'mhs', password: 'mhs123' }
};

module.exports = async function getDB(role) {
  return mysql.createConnection({
    host: 'localhost',
    user: users[role].user,
    password: users[role].password,
    database: 'perpus'
  });
};
