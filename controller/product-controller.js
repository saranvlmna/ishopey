var db = require('../config/db-config');
module.exports = {
    
    addProduct: (product, callback) => {
        db.get().collection('products').insertOne(product).then((data) => {
            callback(data)
        })
    },

    getAllProducts(){
        return db.get().collection('products').find({}).toArray()
    }
}
