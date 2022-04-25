/* Rest api, file included to keep folder on git*/
const express = require("express")
const CognitoService = require('../services/cognito.config')


module.exports = function({ mowerInterface, mowerSessionInterface }) {


    const router = express.Router()

    //Get one specific mower from mower id
    router.get('/:mowerID', function(request, response) {
        const mowerId = request.params.mowerID
        mowerInterface.getMowerByMowerId(mowerId, function(error, mower) {
            if (error.length == 0 && mower.length == 0) {
                response.status(404).end()
            } else if (error.length == 0) {
                response.status(200).json(mower)
            } else {
                response.status(500).json(error)
            }
        })
    })

    //Get all mowers from user id
    router.get('/user/:userID', function(request, response) {
        const userId = request.params.userID
        mowerInterface.getAllMowersByUserId(userId, function(errors, mowers) {
            if (errors.length == 0 && mowers.length == 0) {
                response.status(404).end()
            } else if (errors.length == 0) {
                response.status(200).json(mowers)
            } else {
                response.status(500).json(errors)
            }
        })
    })

    //Start the mower
    router.put('/start/:mowerID', function(request, response) { //post or put i dont know yet
        const mowerId = request.params.mowerID

    })

    //Stop the mower
    router.put('/stop/:mowerID', function(request, response) {
        const mowerId = request.params.mowerID
    })

    //Get positions from mower id
    router.get('/mowerPositions/:mowerID', function(request, response) {
        const mowerId = request.params.mowerID
        mowerSessionInterface.getMowerPositionsByMowerId(mowerId, function(error, mowerPositions) {
            if (error.length == 0 && mowerPositions.length == 0) {
                response.status(404).end()
            } else if (error.length == 0) {
                response.status(200).json(mowerPositions)
            } else {
                response.status(500).json(error)
            }
        })
    })


    //Create a mower
    router.post('/', function(request, response) {
        const userID = request.body.userId
        const serialNumber = request.body.serialNumber
        const status = request.body.status
        mowerInterface.createMower(userID, serialNumber, status, function(error, mowerId) {
            if (error.length == 0) {
                response.status(201).json(mowerId)
            } else {
                response.status(404).end()
            }
        })
    })

    //Delete a mower
    router.delete('/:mowerID', function(request, response) {
        const mowerId = request.params.mowerID
        mowerInterface.deleteMower(mowerId, function(error, mowerDeleted) {
            if (error.length == 0 && mowerDeleted) {
                response.status(204).json()
            } else if (error.length == 0 && !mowerDeleted) {
                response.status(404).json()
            } else {
                response.status(500).json(error)
            }
        })
    })

    router.delete('/positions/:mowingSessionsID', function(request, response) {
        const movingSessionsId = request.params.mowingSessionsID
        mowerSessionInterface.deletePositionData(movingSessionsId, function(error, positionDataDeleted) {
            if (error.length == 0 && positionDataDeleted) {
                response.status(204).json()
            } else if (error.length == 0 && !positionDataDeleted) {
                response.status(404).json()
            } else {
                response.status(500).json(error)
            }
        })
    })

    //Update the status for the mower
    router.put('/:mowerID', function(request, response) {
        const mowerId = request.params.mowerID
        const newStatus = request.body.status
        mowerInterface.updateMowerStatus(mowerId, newStatus, function(errors, mower) {
            if (errors.length == 0) {
                response.status(200).json(mower)
            } else {
                response.status(400).json(errors)
            }
        })
    })

    return router
}