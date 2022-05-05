/* Image router */

const express = require("express")
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem')
const fs = require('fs')
const rawData = fs.readFileSync(process.env.JWK_KEY_PATH)
const jwk = JSON.parse(rawData)
const pem = jwkToPem(jwk.keys[1])

module.exports = function({ mowerInterface }) {

    const router = express.Router()

    /* Add new image */
    router.post('/', function(req, res) {

        return
    })

    return router
}