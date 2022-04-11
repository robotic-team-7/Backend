/* Rest api, file included to keep folder on git*/
const express = require("express")

module.exports = function({ mowerInterface, positionsInterface }) {

    const router = express.Router()

    //Get one specific mower from mower id
    router.get('/:id', function(request, response) {
        const mowerId = request.params.id
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
    router.get('/user/:id', function(request, response) {
        const userID = request.params.id
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
    router.put('/start/:id', function(request, response) { //post or put i dont know yet

    })

    //Stop the mower
    router.put('/stop/:id', function(request, response) {

    })


    //Get positions from position id
    router.get('/positions/:id', function(request, response) {
        const positionsId = request.params.id
        positionsInterface.getPositionsByPositionsId(positionsId, function(error, positions) {
            if (error.length == 0 && positions.length == 0) {
                response.status(404).end()
            } else if (error.length == 0) {
                response.status(200).json(positions)
            } else {
                response.status(500).json(error)
            }
        })
    })

    //Get positions from mower id
    router.get('/mowerPositions/:id', function(request, response) {
        const mowerId = request.params.id
        positionsInterface.getPositionsByMowerId(mowerId, function(error, positions) {
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
                response.status(404).end()
            }
        })
    })

    //Delete a mower
    router.delete('/:id', function(request, response) {
        const mowerID = request.params.id
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

    //Update the status for the mower
    router.put('/:id', function(request, response) {
        const mowerID = request.params.id
        const newStatus = request.body.Status
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