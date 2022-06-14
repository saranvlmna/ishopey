const { response } = require('express');
var express = require('express');
const { route } = require('express/lib/application');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');
var router = express.Router();
var productcontroller = require('../controller/product-controller');

router.get('/', function (req, res, next) {
  productcontroller.getAllProducts().then((products) => {
    res.render('admin/view-product.hbs', { admin: true, products });
  });
});

router.get('/add-products', (req, res) => {
  res.render('admin/add-products');
});

router.post('/add-products', (req, res) => {
  productcontroller.addProduct(req.body, (id) => {
    let image = req.files.image;
    image.mv('./public/images/' + id + '.jpg', (err, done) => {
      if (!err) {
        res.render('admin/add-products');
      } else {
        console.log(err);
      }
    });
  });
});

router.get('/delete-product/:id', (req, res) => {
  const id = req.params.id;
  productcontroller.deleteProduct(id).then((response) => {
    res.redirect('/admin/');
  });
});

router.get('/edit-product/', async (req, res) => {
  const id = req.query.id;
  let product = await productcontroller.getProductDetails(id);
  res.render('admin/edit-products.hbs', { product });
});

router.post('/edit-product/', async (req, res) => {
  var id = req.query.id;
  await productcontroller.updateProduct(id, req.body);
  if (req.files.image) {
    var image = req.files.image;
    image.mv('./public/images/' + id + '.jpg');
  }
  res.redirect('/admin/');
});
router.get('/allOrders', async (req, res) => {
  const ordrs = await productcontroller.getAllOrders()
  res.render('admin/orders.hbs', { ordrs });
})
router.get('/allusers',async(req,res)=> {
  const allUser = await productcontroller.getAllUsers()
  // console.log(allUser)
})


module.exports = router;
