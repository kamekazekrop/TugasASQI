var express = require('express');
var router = express.Router();
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/hotel', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const connection = mongoose.connection;
// connection.once('open', function () {
//   console.log("MongoDB database connection established successfully");
// });

// const Kamar = mongoose.model('kamar', {
//   namakamar: String,
//   fasilitas: String,
//   harga: String
// });

/* GET home page. */
router.get('/', function (req, res, next) {
    let data = {
        // layout: 'admin',
        title: 'halaman admin',

    };

    res.render('admin/index', data);
});

// router.get('/login', function (req, res, next) {
//     res.render('login');
// })
module.exports = router;