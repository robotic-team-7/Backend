const express = require("express")
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem')
const fs = require('fs')
const rawData = fs.readFileSync(process.env.JWK_KEY_PATH)
const jwk = JSON.parse(rawData)
const pem = jwkToPem(jwk.keys[1])

module.exports = function({ mowerInterface, mowingSessionInterface }) {

    const router = express.Router()


    //Get one specific mower from mower id
    router.get('/:mowerId', function(request, response) {
        const mowerId = request.params.mowerId
        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)
        jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(error, payload) {
            if (error != null) {
                response.status(401).end()
            } else {
                mowerInterface.getMowerByMowerId(payload.sub, mowerId, function(error, mower) {
                    if (error.length == 0 && mower.length == 0) {
                        response.status(404).end()
                    } else if (error.length == 0) {
                        response.status(200).json(mower)
                    } else {
                        response.status(500).json(error)
                    }
                })
            }
        })
    })





    //Get all mowers from user id
    router.get('/user/mowers', function(request, response) {
        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)
        jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(error, payload) {
            if (error != null) {
                response.status(401).end()
            } else {
                mowerInterface.getAllMowersByUserId(payload.sub, function(errors, mowers) {
                    if (errors.length == 0 && mowers.length == 0) {
                        response.status(404).end()
                    } else if (errors.length == 0) {
                        response.status(200).json(mowers)
                    } else {
                        response.status(500).json(errors)
                    }
                })
            }
        })
    })




    /*
        //Start the mower
        router.put('/start/:mowerId', function(request, response) { //post or put i dont know yet
            const mowerId = request.params.mowerId

        })

        //Stop the mower
        router.put('/stop/:mowerId', function(request, response) {
            const mowerId = request.params.mowerId
        })
    */




    //Get specific mowingSession by mowingsessionID
    router.get('/mowingSession/:mowingSessionId', function(request, response) {
        const mowingSessionId = request.params.mowingSessionId
        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)
        jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(error, payload) {
            if (error != null) {
                response.status(401).end()
            } else {
                mowingSessionInterface.getMowingSessionByMowingSessionId(payload.sub, mowingSessionId, function(error, mowingSession) {
                    if (error.length == 0 && mowingSession.length == 0) {
                        response.status(404).end()
                    } else if (error.length == 0) {
                        response.status(200).json(mowingSession)
                    } else {
                        response.status(500).json(error)
                    }
                })
            }
        })
    })




    //Get all mowingSessions from one mower by mowerId
    router.get('/mowingSessions/:mowerId', function(request, response) {
        const mowerId = request.params.mowerId
        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)
        jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(error, payload) {
            if (error != null) {
                response.status(401).end()
            } else {
                mowingSessionInterface.getAllMowingSessionsByMowerId(payload.sub, mowerId, function(error, mowingSessions) {
                    if (error.length == 0 && mowingSessions.length == 0) {
                        response.status(404).end()
                    } else if (error.length == 0) {
                        response.status(200).json(mowingSessions)
                    } else {
                        response.status(500).json(error)
                    }
                })
            }
        })
    })




    //Create a mower
    router.post('/mower', function(request, response) {
        const mowerId = request.body.mowerId
        console.log(mowerId)
        const status = request.body.status
        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)
        jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(error, payload) {
            if (error != null) {
                response.status(401).end()
            } else {
                mowerInterface.createMower(payload.sub, mowerId, status, function(error, mowerId) {
                    if (error.length == 0) {
                        response.status(201).json(mowerId)
                    } else {
                        response.status(404).json(error)
                    }
                })
            }
        })
    })




    //Delete a mower
    router.delete('/mower/:mowerId', function(request, response) {
        const mowerId = request.params.mowerId
        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)
        jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(error, payload) {
            if (error != null) {
                response.status(401).end()
            } else {
                mowerInterface.deleteMower(payload.sub, mowerId, function(error, mowerDeleted) {
                    if (error.length == 0 && mowerDeleted) {
                        response.status(200).json(mowerDeleted)
                    } else if (error.length == 0 && !mowerDeleted) {
                        response.status(404).json(mowerDeleted)
                    } else {
                        response.status(500).json(error)
                    }
                })
            }
        })
    })





    router.delete('/mowingSession/:mowingSessionId', function(request, response) {
        const mowingSessionID = request.params.mowingSessionId
        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)
        jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(error, payload) {
            if (error != null) {
                response.status(401).end()
            } else {
                mowingSessionInterface.deleteMowingSession(payload.sub, mowingSessionID, function(error, mowingSessionDeleted) {
                    if (error.length == 0 && mowingSessionDeleted) {
                        response.status(200).json(mowingSessionDeleted)
                    } else if (error.length == 0 && !mowingSessionDeleted) {
                        response.status(404).json(mowingSessionDeleted)
                    } else {
                        response.status(500).json(error)
                    }
                })
            }
        })
    })





    //Update the status for the mower
    router.put('/mower/:mowerId', function(request, response) {
        const mowerId = request.params.mowerId
        const newStatus = request.body.status
        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer ".length)
        jwt.verify(accessToken, pem, { algorithms: ['RS256'] }, function(error, payload) {
            if (error != null) {
                response.status(401).end()
            } else {
                mowerInterface.updateMowerStatus(payload.sub, mowerId, newStatus, function(errors, mower) {
                    if (errors.length == 0) {
                        response.status(200).json(mower)
                    } else {
                        response.status(400).json(errors)
                    }
                })
            }
        })
    })




    return router
}