var express = require('express');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
var productcontroller = require('../controller/product-controller');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  productcontroller.getAllProducts().then((products)=>{
    res.render('users/view-product.hbs', { admin: false, products })
  })
});
router.get('/login',(req,res)=>{
  res.render('users/login.hbs')
})
router.get('/signup',(req,res)=>{
  res.render('users/signup.hbs')
})
module.exports = router;
