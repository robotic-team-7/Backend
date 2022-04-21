/* Mower API router */

const express = require("express")

module.exports = function({ mowerInterface }) {

    const router = express.Router()

    /* Retrieve Mower by MowerID */
    router.get('/:mowerId', function(req, res) {

        let MowerID = req.params.mowerId

        /* Call mowerInterface to get mower by mowerId*/
        mowerInterface.getMowerById(mowerId, function(error, mower) {

            res.send(mower)
        })
    })

    /* Retrieve all mowers by userId */
    router.get('/:userId', function(req, res) {

        let userId = req.params.userId

        mowerInterface.getAllmMowersByUserId(userId, function(error, mowers) {

            res.send(mowers)
        })
    })

    /* Create new mower */
    router.post('/', function(req, res) {

        let userId = req.body.userId
        let serialNumber = req.body.serialNumber
        let status = req.body.status

        /* Call mowerInterface to create new mower */
        mowerInterface.createMower(userId, serialNumber, status, function(error, mowerId) {

            if (error) {
                res.send(error)
            }
            else {
                res.redirect('/mowers/'+mowerId)
            }
        })
    })

    /* Update mower status */
    router.put('/:mowerId', function(req, res) {

        let mowerId = req.params.mowerId
        let status = req.body.status

        /* Call mowerInterface to update mower status */
        mowerInterface.updateMowerStatus(mowerId, status, function(error, newMowerStatus) {

            if (error) {
                res.send(error)
            }
            else {
                res.send(newMowerStatus)
            }
        })
    })

    /* Delete mower */
    router.delete('/:mowerId', function(req, res) {

        let mowerId = req.params.mowerId

        /* Call mowerInterface to delete mower */
        mowerInterface.deleteMower(mowerId, function(error, mowerDeleted) {
            if (error) {
                res.send(error)
            }
            else {
                res.send(mowerDeleted)
            }
        })
    })

    return router
}