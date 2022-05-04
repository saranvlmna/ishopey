const db = require('../config/db-config');
const collection = require('../config/collections')

const bcript = require('bcrypt');
const async = require('hbs/lib/async');
module.exports = {
    Signup: (data) => {
        try {
            return new Promise(async (resolve, reject) => {
                data.password = await bcript.hash(data.password, 10)
                db.get().collection(collection.USER).insertOne(data).then
                resolve(data)
            })
        } catch (error) {
            console.log(error)
        }

    },
    Login: (data) => {
        try {
            return new Promise(async (resolve, reject) => {
                var loginStatus = false
                var response = {}
                var user = await db.get().collection(collection.USER).findOne({ email: data.email })
                if (user) {
                    bcript.compare(data.password, user.password).then((result) => {
                        if (result) {
                            response.user = user
                            response.status = true
                            resolve(response)
                        }
                        else {
                            resolve({ status: false })
                        }
                    })
                } else {
                    resolve({ status: false })
                }

            })
        } catch (error) {
            console.log(error)
        }
    }
}