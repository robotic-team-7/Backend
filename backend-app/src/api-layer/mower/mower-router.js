/* Mower API router */

const express = require("express")
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem')
const fs = require('fs')
const rawData = fs.readFileSync(process.env.JWK_KEY_PATH)
const jwk = JSON.parse(rawData)
const pem = jwkToPem(jwk.keys[1])

module.exports = function({ mowerInterface }) {

    const router = express.Router()

    /* Update mower status */
    router.put('/:mowerId', function(req, res) {
        let mowerId = req.params.mowerId
        let status = req.body.status
        const authorizationHeader = req.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)
        jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(error, payload) {
            if (error != null) {
                res.status(401).end()
            } else {
                /* Call mowerInterface to update mower status */
                mowerInterface.updateMowerStatus(payload.sub, mowerId, status, function(error, newMowerStatus) {

                    if (error.length == 0) {
                        res.status(200).json(newMowerStatus)
                    } else if (newMowerStatus != status) {
                        res.status(400).json(error)
                    } else {
                        res.status(500).json(error)
                    }
                })
            }
        })
    })



    return router
}