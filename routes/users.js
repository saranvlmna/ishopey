var express = require('express');
var productcontroller = require('../controller/product-controller');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  productcontroller.getAllProducts().then((products)=>{
    res.render('users/view-product.hbs', { admin: false, products })
  })

});
module.exports = router;
