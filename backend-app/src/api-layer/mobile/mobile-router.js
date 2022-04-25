const express = require("express")

module.exports = function({ mowerInterface, mowingSessionInterface }) {

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
        const userID = request.params.userID
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
        mowingSessionInterface.getMowerPositionsByMowerId(mowerId, function(error, positions) {
            if (error.length == 0 && positions.length == 0) {
                response.status(404).end()
            } else if (error.length == 0) {
                response.status(200).json(positions)
            } else {
                response.status(500).json(error)
            }
        })
    })


    //Create a mower
    router.post('/', function(request, response) {
        const userID = request.body.UserID
        const serialNumber = request.body.SerialNumber
        const status = request.body.Status
        mowerInterface.createMower(userID, serialNumber, status, function(error, MooverID) {
            if (error.length == 0) {
                response.status(201).json(MooverID)
            } else {

                response.status(404).json(error)
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

    router.delete('/positions/:movingPositionsID', function(request, response) {
        const movingPositionsID = request.params.movingPositionsID
        console.log(movingPositionsID)
        mowingSessionInterface.deleteMowingSession(movingPositionsID, function(error, movingSessionDeleted) {
            if (error.length == 0 && movingSessionDeleted) {
                response.status(204).json()
            } else if (error.length == 0 && !movingSessionDeleted) {
                response.status(404).json()
            } else {
                response.status(500).json(error)
            }
        })
    })

    //Update the status for the mower
    router.put('/:mowerID', function(request, response) {
        const mowerId = request.params.mowerID
        const newStatus = request.body.Status
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