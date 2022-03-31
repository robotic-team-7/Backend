/* Rest api, file included to keep folder on git*/
const express = require("express")

module.exports = function() {

    const router = express.Router()

    router.get('/', function(req, res) {


        res.send("Rest page!")

    })


    return router
}