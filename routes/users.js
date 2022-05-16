var express = require('express');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
var productcontroller = require('../controller/product-controller');
var auth = require('../controller/auth');
const { redirect } = require('express/lib/response');
const async = require('hbs/lib/async');
var router = express.Router();

/* GET home page. */

const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  }
  else {
    res.redirect('/')
  }
}

router.get('/', async function (req, res, next) {
  let user = req.session.user;
  let cartCount = null
  if (user) {
    cartCount = await productcontroller.getCartCount(user._id);
  }
  productcontroller.getAllProducts().then((products) => {
    res.render('users/view-product.hbs', { admin: false, products, user, cartCount });
  })
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
  }
  else
    res.render('users/login.hbs', { "logginEror": req.session.logginEror })
  req.session.logginEror = false
})

router.get('/signup', (req, res) => {
  res.render('users/signup.hbs')
})

router.post('/signup', (req, res) => {
  auth.Signup(req.body).then((data) => {
    req.session.loggedIn = true
    req.session.user = data
    res.redirect('/')
  })
})

router.post('/login', (req, res) => {
  auth.Login(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.logginEror = "Invalid  Username or Password"
      res.redirect('/login')
    }
  })
})
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})

router.get("/getCartProducts", verifyLogin, async (req, res) => {
  const product = await productcontroller.getCart(req.session.user._id)
  const count = product.length
  res.render('users/cart.hbs', { product, user: req.session.user })
})

router.get("/addto-cart", verifyLogin, async (req, res) => {
  var PrId = req.query.id
  var userId = req.session.user._id
  await productcontroller.AddToCart(userId, PrId)
  res.redirect('/')
})


module.exports = router;
