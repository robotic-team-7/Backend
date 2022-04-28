/* Image router */

const express = require("express")
const multer = require("multer")
const upload = multer()

module.exports = function({ mowerInterface }) {

    const router = express.Router()

    /* Add new image */
    router.post('/', upload.none(), function(req, res) {

        
    })

    return router
}