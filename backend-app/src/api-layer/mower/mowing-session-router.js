/* Mowing session router */

const express = require("express")
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem')
const fs = require('fs')
const rawData = fs.readFileSync(process.env.JWK_KEY_PATH)
const jwk = JSON.parse(rawData)
const pem = jwkToPem(jwk.keys[1])

module.exports = function({ mowingSessionInterface }) {

    const router = express.Router()

    /* Create new mowing session */
    router.post('/', function(req, res) {

        let mowerPositions = req.body.mowerPositions
        let mowerId = req.body.mowerId
        const authorizationHeader = req.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)
        jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(error, payload) {
            if (error != null) {
                res.status(401).end()
            } else {
                mowingSessionInterface.createMowingSession(payload.sub, mowerPositions, mowerId, function(error, mowingSessionId) {

                    if (error.length == 0) {
                        res.status(200).json(mowingSessionId)
                    } else {
                        res.status(400).json(error)
                    }
                })
            }
        })
    })

    /* Add new positions to mowing session */
    router.put('/', function(req, res) {

        let mowingSessionId = req.body.mowingSessionId
        let newMowerPositions = req.body.newMowerPositions
        const authorizationHeader = req.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)
        jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(error, payload) {
            if (error != null) {
                res.status(401).end()
            } else {
                mowingSessionInterface.addMowerPositions(payload.sub, mowingSessionId, newMowerPositions, function(error, mowerPositions) {

                    if (error.length == 0) {
                        res.status(200).json(mowerPositions)
                    } else {
                        res.status(400).json(error)
                    }
                })
            }
        })
    })

    return router
}