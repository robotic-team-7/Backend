/* Obstacle router */

const express = require("express")
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem')
const fs = require('fs')
const rawData = fs.readFileSync(process.env.JWK_KEY_PATH)
const jwk = JSON.parse(rawData)
const pem = jwkToPem(jwk.keys[1])


/* To check if user is authorized to upload image */
var auth = function(request, response, next) {
    authorizationHeader = request.header("Authorization")
    const accessToken = authorizationHeader.substring("Bearer ".length)
    jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(error, payload) {
        if (error != null) {
            response.status(401).end()
        } else {
            next()
        }
    })
}




module.exports = function({ obstacleInterface, s3Bucket }) {

    const router = express.Router()

    /* Add Obstacle */
    router.post('/add', auth, s3Bucket.upload.single('obstacleImage'), function(request, response) {
        const imagePath = request.file.location
        const mowingSessionId = request.body.mowingSessionId
        const obstaclePosition = request.body.obstaclePosition
        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)
        jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(error, payload) {
            if (error != null) {
                response.status(401).end()
            } else {
                obstacleInterface.createObstacle(payload.sub, mowingSessionId, obstaclePosition, imagePath, function(error, created) {
                    if (error.length == 0) {
                        response.status(201).json(created)
                    } else {
                        response.status(404).json(error)
                    }
                })
            }
        })
    })




    return router
}