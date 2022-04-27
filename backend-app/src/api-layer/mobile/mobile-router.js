const express = require("express")

module.exports = function({ mowerInterface, mowingSessionInterface }) {

    const router = express.Router()

    //Get one specific mower from mower id
    router.get('/:mowerId', function(request, response) {
        const mowerID = request.params.mowerId
        mowerInterface.getMowerByMowerId(mowerID, function(error, mower) {
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
    router.get('/user/:userId', function(request, response) {
        const userID = request.params.userId
        console.log(userID)
        mowerInterface.getAllMowersByUserId(userID, function(errors, mowers) {
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
    router.put('/start/:mowerId', function(request, response) { //post or put i dont know yet
        const mowerId = request.params.mowerId

    })

    //Stop the mower
    router.put('/stop/:mowerId', function(request, response) {
        const mowerId = request.params.mowerId
    })

    //Get specific mowingSession by mowingsessionID
    router.get('/mowerSessionPositions/:mowingSessionId', function(request, response) {
        const mowingSessionID = request.params.mowingSessionId
        mowingSessionInterface.getMowingSessionByMowingSessionId(mowingSessionID, function(error, mowingSession) {
            if (error.length == 0 && mowingSession.length == 0) {
                response.status(404).end()
            } else if (error.length == 0) {
                response.status(200).json(mowingSession)
            } else {
                response.status(500).json(error)
            }
        })
    })

    //Get all mowingSession from one mower by mowerId
    router.get('/mowerSessions/:mowerId', function(request, response) {
        const mowerID = request.params.mowerId
        mowingSessionInterface.getAllMowingSessionsByMowerId(mowerID, function(error, mowingSessions) {
            if (error.length == 0 && mowingSessions.length == 0) {
                response.status(404).end()
            } else if (error.length == 0) {
                response.status(200).json(mowingSessions)
            } else {
                response.status(500).json(error)
            }
        })
    })



    //Create a mower
    router.post('/mower', function(request, response) {
        const userId = request.body.userId
        const serialNumber = request.body.serialNumber
        const status = request.body.status
        mowerInterface.createMower(userId, serialNumber, status, function(error, MooverID) {
            if (error.length == 0) {
                response.status(201).json(MooverID)
            } else {
                response.status(404).json(error)
            }
        })
    })

    //Delete a mower
    router.delete('/mower/:mowerId', function(request, response) {
        const mowerID = request.params.mowerId
        mowerInterface.deleteMower(mowerID, function(error, mowerDeleted) {
            if (error.length == 0 && mowerDeleted) {
                response.status(204).json()
            } else if (error.length == 0 && !mowerDeleted) {
                response.status(404).json()
            } else {
                response.status(500).json(error)
            }
        })
    })

    router.delete('/mowingSession/:mowingSessionId', function(request, response) {
        const mowingSessionID = request.params.mowingSessionId
        mowingSessionInterface.deleteMowingSession(mowingSessionID, function(error, mowingSessionDeleted) {
            if (error.length == 0 && mowingSessionDeleted) {
                response.status(204).json()
            } else if (error.length == 0 && !mowingSessionDeleted) {
                response.status(404).json()
            } else {
                response.status(500).json(error)
            }
        })
    })

    //Update the status for the mower
    router.put('/mower/:mowerId', function(request, response) {
        const mowerID = request.params.mowerId
        const newStatus = request.body.status
        mowerInterface.updateMowerStatus(mowerID, newStatus, function(errors, mower) {
            if (errors.length == 0) {
                response.status(200).json(mower)
            } else {
                response.status(400).json(errors)
            }
        })
    })

    return router
}