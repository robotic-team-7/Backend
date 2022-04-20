/* Mowing session router */

const express = require("express")

module.exports = function({ mowerSessionInterface }) {

    const router = express.Router()

    /* Create new mowing session */
    router.post('/create', function(req, res) {

        let mowerPositions = req.body.mowerPositions
        let mowerId = req.body.mowerID

        mowerSessionInterface.createMowerSession(mowerPositions, mowerId, function(error, mowerSessionId) {

            if (error) {
                res.send(error)
            } else {
                res.send(mowerSessionId)
            }
        })
    })

    /* Add new positions to mowing session */
    router.post('/add-positions', function(req, res) {

        let mowingSessionId = req.body.mowingSessionId
        let newMowerPositions = req.body.newMowerPositions

        mowerSessionInterface.addMowerPositions(mowingSessionId, newMowerPositions, function(error, mowerPositions) {

            if (error) {
                res.send(error)
            } else {
                res.send(mowerPositions)
            }
        })
    })

    /* Retrieve mowerPositions by mowerId */
    router.get('/:mowerId', function(req, res) {

        let mowerId = req.params.mowerId

        mowerSessionInterface.getPositionsByMowerId(mowerId, function(error, mowerPositions) {

            if (error) {
                res.send(error)
            } else {
                res.send(mowerPositions)
            }
        })
    })

    /* Delete positions by mowingSessionId */
    router.delete('/:mowingSessionId', function(req, res) {

        let mowingSessionId = req.params.mowingSessionId

        mowerSessionInterface.deletePositionData(mowingSessionId, function(error, mowingSessionDeleted) {

            if (error) {
                res.send(error)
            } else {
                res.send(mowingSessionDeleted)
            }
        })
    })

    return router
}