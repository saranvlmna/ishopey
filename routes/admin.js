var express = require('express');
const { route } = require('express/lib/application');
const { ObjectId } = require('mongodb');
var router = express.Router();
var productcontroller = require('../controller/product-controller');
/* GET users listing. */
router.get('/', (req, res, next) => {
productcontroller.getAllProducts().then((products)=>{
  res.render('admin/view-product.hbs', { admin: true, products })
})
});

router.get('/add-products', (req, res) => {
  res.render('admin/add-products')
})

router.post('/add-products', (req, res) => {

  productcontroller.addProduct(req.body, (result) => {
    const id=result.insertedId.toString()
    let image = req.files.image
    image.mv('./public/product-img/' + id + '.png', (err, done) => {
      if (!err) {
        res.render('admin/add-products')

      }
      else{
        console.log(err)
      }

    })
  })

})

module.exports = router;
