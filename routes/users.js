var express = require('express');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
var productcontroller = require('../controller/product-controller');
var auth = require('../controller/auth');
const { redirect } = require('express/lib/response');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user;
  console.log(user);
  productcontroller.getAllProducts().then((products) => {
    res.render('users/view-product.hbs', { admin: false, products, user });
  })
});
router.get('/login', (req, res) => {
  res.render('users/login.hbs')
})
router.get('/signup', (req, res) => {
  res.render('users/signup.hbs')
})
router.post('/signup', (req, res) => {
  auth.Signup(req.body).then((data) => {
  })
})
router.post('/login', (req, res) => {
  auth.Login(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      res.redirect('/login')
    }
  })
})
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})

module.exports = router;
