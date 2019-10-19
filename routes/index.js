var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let data = {
    layout: 'frontend',
    title: 'Hotel Matrik',

  };

  res.render('index', data);
});

router.get('/login', function (req, res, next) {
  res.render('login');
})
module.exports = router;