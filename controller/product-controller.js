var db = require('../config/db-config');
var collection = require('../config/collections');
module.exports = {

    addProduct: (product, callback) => {
        db.get().collection(collection.PRODUCT).insertOne(product).then((data) => {
            callback(data.insertedId)
        })
    },

    getAllProducts() {
        return new Promise(async (resolve, reject) => {
            let products = await db.get().collection(collection.PRODUCT).find().toArray()
            resolve(products)
        })
    }
}
