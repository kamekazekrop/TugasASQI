var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/opik', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
});

const Kamar = mongoose.model('kamar', {
  namakamar: String,
  fasilitas: String,
  harga: String
});

/* GET home page. */
router.get('/', function (req, res, next) {
  Kamar.find((err, resData) => {
    let data = {

      title: 'Kelola Kamar',
      kamar: resData
    };
    console.log(resData);
    res.render('kamar', data);
  });
});

router.get('/tambah', function (req, res, next) {

  let data = {

    title: 'Tambah Kamar',

  };
  res.render('kamar/tambah', data);
});

router.post('/tambah', function (req, res, next) {
  let dataKamar = req.body;
  let kamar = new Kamar(dataKamar);
  kamar.save().then(resData => {
    res.redirect('/admin/kamar');
  }).catch(err => {
    res.status(400).send('Simpan kelas gagal!');
  });
});

router.get('/ubah/:id', function (req, res, next) {
  Kamar.findById(req.params.id, (err, resData) => {
    let data = {
      title: 'Halaman Admin',
      kamar: resData
    };
    res.render('kamar/ubah', data);
  });
});

router.post('/:id/berhasil', function (req, res, next) {
  let dataKamar = req.body;
  Kamar.findById(req.params.id, function (err, resData) {
    if (!resData) {
      res.status(400).send("data tidak di temukan");
    } else {
      resData.namakamar = dataKamar.namakamar;
      resData.fasilitas = dataKamar.fasilitas;
      resData.harga = dataKamar.harga;
      resData.save().then(resData => {
        res.redirect('/admin/kamar');
      })
    }
  });
});

router.get('/:id/delete', function (req, res, next) {
  Kamar.findById(req.params.id, function (err, resData) {
    if (!resData) {
      res.status(404).send("data tidak ditemukan!");
    } else {
      resData.delete().then(resData => {
        res.redirect('/admin/kamar');
      })
    }
  });
});



// router.get('/login', function (req, res, next) {
//   res.render('login');
// })
module.exports = router;