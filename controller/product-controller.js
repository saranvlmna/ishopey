var db = require('../config/db-config');
var collection = require('../config/collections');
const { reject } = require('bcrypt/promises');
const { response } = require('express');
const async = require('hbs/lib/async');
var ObjectId = require('mongodb').ObjectId
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
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT).deleteOne({ _id: ObjectId(id) }).then((response) => {
                resolve(response)
            })
        })
    },
    getProductDetails: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT).findOne({ _id: ObjectId(id) }).then((data) => {
                resolve(data)
            })
        })
    },
    updateProduct: (id, data) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT).updateOne({ _id: ObjectId(id) },
                {
                    $set: {
                        name: data.name,
                        caregory: data.caregory,
                        desccription: data.desccription,
                        price: data.price
                    }
                }).then((response) => {
                    resolve(response)
                })
        })
    },
    AddToCart: (userId, PrId) => {
        try {
            return new Promise(async (resolve, reject) => {
                let userCart = await db.get().collection(collection.CART).findOne({ user: ObjectId(userId) })
                if (userCart) {
                    db.get().collection(collection.CART).updateOne({ user: ObjectId(userId) },
                        {

                            $push: { products: ObjectId(PrId) }

                        }
                    ).then((response) => {
                        resolve(response)
                    })
                }
                else {
                    let cartObj = {
                        user: ObjectId(userId),
                        products: [ObjectId(PrId)]
                    }
                    db.get().collection(collection.CART).insertOne(cartObj).then((response) => {
                        resolve(response)
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    },
    getCart: (userId) => {
        return new Promise(async (resolve, reject) => {

            var cartItems = await db.get().collection(collection.CART).aggregate([//aggregate is used to perform multiple operations on the data
                {
                    $match: { user: ObjectId(userId) }//match is used to filter the data
                },
                {
                    $lookup: {//lookup is used to join the data
                        from: collection.PRODUCT,//from is the collection name
                        let: { prodList: '$products' },//let is the variable name
                        pipeline: [//pipeline is the operations to be performed on the data
                            {
                                $match: {
                                    $expr: {//expr is used to perform operations on the data
                                        $in: ['$_id', "$$prodList"]//in is used to check if the data is present in the collection
                                    }
                                }
                            }
                        ],
                        as: "cartItems"//as is the variable name
                    }
                }
            ]).toArray()
            // resolve(cartItems)
            resolve(cartItems[0].cartItems)

        })
    },
    getCartCount(userId) {
        return new Promise(async (resolve, reject) => {
            let cart = await db.get().collection(collection.CART).findOne({ user: ObjectId(userId) })
            if (cart) {
                resolve(cart.products.length)
            }
            else {
                resolve(0)
            }
        })
    }

}
