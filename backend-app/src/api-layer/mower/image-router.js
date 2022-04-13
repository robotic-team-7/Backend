/* Image router */

const express = require("express")

module.exports = function({ mowerInterface }) {

    const router = express.Router()

    /* Retrieve all images */
    router.get('/', function(req, res) {


        res.send("Images page!")

    })

    /* Retrieve an image by ImageID */
    router.get('/imageId', function(req, res) {

        let imageId = req.params.imageId

        res.send("Image goes here...")
    })

    /* Add new image */
    router.post('/', function(req, res) {

        return
    })

    return router
}