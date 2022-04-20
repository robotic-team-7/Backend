/* Positions router */

const express = require("express")

module.exports = function({ mowerSessionInterface }) {

    const router = express.Router()

    /* Create new Positions Instance */
    router.post('/create-instance', function(req, res) {

        let positions = req.body.positions
        let mowerId = req.body.mowerID

        mowerSessionInterface.createMowerSession(positions, mowerId, function(error, mowerSessionId) {

            if (error) {
                res.send(error)
            } else {
                res.send(mowerSessionId)
            }
        })
    })

    /* Add new positions to positions instance */
    router.post('/add', function(req, res) {

        let positionsId = req.body.positionsId
        let newPositions = req.body.newPositions

        mowerSessionInterface.addPositions(positionsId, newPositions, function(error, positions) {

            if (error) {
                res.send(error)
            } else {
                res.send(positions)
            }
        })
    })

    /* Retrieve positions by mowerId */
    router.get('/:mowerId', function(req, res) {

        let mowerId = req.params.mowerId

        mowerSessionInterface.getPositionsByMowerId(mowerId, function(error, positions) {

            if (error) {
                res.send(error)
            } else {
                res.send(positions)
            }
        })
    })

    /* Delete positions by positionsId */
    router.delete('/:positionsId', function(req, res) {

        let positionsId = req.params.positionsId

        mowerSessionInterface.deletePositionData(positionsId, function(error, positionDataDeleted) {

            if (error) {
                res.send(error)
            } else {
                res.send(positionDataDeleted)
            }
        })
    })

    return router
}