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

const Vila = mongoose.model('vila', {
    namahotel: String,
    alamat: String
});

/* GET home page. */
router.get('/', function (req, res, next) {
    Vila.find((err, resData) => {
        let data = {
            title: 'Info Hotel',
            vila: resData
        };
        console.log(resData);
        res.render('hotel/index', data);
    });
});

router.get('/tambah', function (req, res, next) {
    Vila.findById(req.params.id, (err, resData) => {
        let data = {
            title: 'Tambah',
            vila: resData
        };
        res.render('hotel/tambah', data);

    });

});

router.post('/tambah', function (req, res, next) {
    let dataVila = req.body;
    let vila = new Vila(dataVila);
    vila.save().then(resData => {
        res.redirect('/admin/hotel');
    }).catch(err => {
        res.status(400).send('Simpan hotel gagal!');
    });
});

router.get('/ubah/:id', function (req, res, next) {
    Vila.findById(req.params.id, (err, resData) => {
        let data = {
            title: 'Info Hotel',
            vila: resData
        };
        res.render('hotel/ubah', data);
    });
});

router.post('/:id/berhasil', function (req, res, next) {
    let dataVila = req.body;
    Vila.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {
            resData.namahotel = dataVila.namahotel;
            resData.alamat = dataVila.alamat;
            resData.save().then(resData => {
                res.redirect('/admin/hotel');
            })
        }
    });
});
// router.get('/login', function (req, res, next) {
//   res.render('login');
// })
module.exports = router;