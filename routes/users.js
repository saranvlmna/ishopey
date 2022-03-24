var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  let products = [
    {
      name: "Iphone",
      category: 'mobile',
      price: 1000,
      description: 'Iphone is a mobile phone from Apple Inc.',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMPihIju0BBCwq0HWOFF-aZo8vlz2FCOl7fg&usqp=CAU"
    },
    {
      name: "Iphone",
      category: 'mobile',
      price: 1000,
      description: 'Iphone is a mobile phone from Apple Inc.',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMPihIju0BBCwq0HWOFF-aZo8vlz2FCOl7fg&usqp=CAU"
    }
  ]

  res.render('index', { products, admin: false });
});
module.exports = router;
