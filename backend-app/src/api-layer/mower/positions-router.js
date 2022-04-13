/* Positions router */

const express = require("express")

module.exports = function({ positionsInterface }) {

    const router = express.Router()

    /* Create new Positions Instance */
    router.post('/create-instance', function(req, res) {

        let positions = req.body.positions
        let mowerId = req.body.mowerID
        
        positionsInterface.createPositionsInstance(positions, mowerId, function (error, positionsId) {

            if (error) {
                res.send(error)
            }
            else {
                res.send(positionsId)
            }
        })
    })

    /* Add new positions to positions instance */
    router.post('/add', function(req, res) {

        let positionsId = req.body.positionsId
        let newPositions = req.body.newPositions

        positionsInterface.addPositions(positionsId, newPositions, function(error, positions) {

            if (error) {
                res.send(error)
            }
            else {
                res.send(positions)
            }
        })
    })

    /* Retrieve positions by mowerId */
    router.get('/:mowerId', function(req, res) {

        let mowerId = req.params.mowerId

        positionsInterface.getPositionsByMowerId(mowerId, function(error, positions) {

            if (error) {
                res.send(error)
            }
            else {
                res.send(positions)
            }
        })
    })

    /* Delete positions by positionsId */
    router.delete('/:positionsId', function(req, res) {

        let positionsId = req.params.positionsId

        positionsInterface.deletePositionData(positionsId, function(error, positionDataDeleted) {

            if (error) {
                res.send(error)
            }
            else {
                res.send(positionDataDeleted)
            }
        })
    })

    return router
}