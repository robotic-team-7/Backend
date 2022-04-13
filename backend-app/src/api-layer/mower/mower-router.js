/* Mower API router */

const express = require("express")

module.exports = function({ mowerInterface }) {

    const router = express.Router()

    /* Retrieve Mower by MowerID */
    router.get('/:MowerID', function(req, res) {

        let MowerID = req.params.MowerID

        /* Call mowerInterface to get Mower by MowerID*/
        mowerInterface.getMowerById(MowerID, function(error, Mower) {

            res.send(Mower)
        })
    })

    /* Retrieve all Mowers by UserID */
    router.get('/:UserID', function(req, res) {

        let UserID = req.params.UserID

        mowerInterface.getAllmMowersByUserId(UserID, function(error, Mowers) {

            res.send(Mowers)
        })
    })

    /* Create new Mower */
    router.post('/', function(req, res) {

        let UserID = req.body.UserID
        let SerialNumber = req.body.SerialNumber
        let Status = req.body.Status

        /* Call mowerInterface to create new Mower */
        mowerInterface.createMower(UserID, SerialNumber, Status, function(error, MowerID) {

            if (error) {
                res.send(error)
            }
            else {
                res.redirect('/mowers/'+MowerID)
            }
        })
    })

    /* Update Mower Status */
    router.put('/:MowerID', function(req, res) {

        let MowerID = req.params.MowerID
        let Status = req.body.Status

        /* Call mowerInterface to update Mower Status */
        mowerInterface.updateMowerStatus(MowerID, Status, function(error, newMowerStatus) {

            if (error) {
                res.send(error)
            }
            else {
                res.send(newMowerStatus)
            }
        })
    })

    /* Delete Mower */
    router.delete('/:MowerID', function(req, res) {

        let MowerID = req.params.MowerID

        /* Call mowerInterface to delete Mower */
        mowerInterface.deleteMower(MowerID, function(error, mowerDeleted) {
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