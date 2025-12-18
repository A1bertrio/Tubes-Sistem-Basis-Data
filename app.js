const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/admin', require('./routes/admin'));
app.use('/buku', require('./routes/buku'));
app.use('/peminjaman', require('./routes/peminjaman'));

app.get('/', (req, res) => {
  res.redirect('/login.html');
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
