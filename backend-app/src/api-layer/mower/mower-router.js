/* Mower API router */

const express = require("express")

module.exports = function({ mowerInterface }) {

    const router = express.Router()

    /* Retrieve list of all Mowers */
    router.get('/', function(req, res) {


        res.send("Here there should be a list of all Mowers!")

    })

    /* Retrieve Mower information */
    router.get('/:MowerID', function(req, res) {

        let MowerID = req.params.MowerID

        /* Call mowerInterface to get Mower by MowerID*/
        
        /* Waiting for this to be implemented in mowerInterface */

        res.send("Here there should eventually be some information about Mower with ID "+MowerID)

    })

    /* Create new Mower */
    router.post('/', function(req, res) {

        let UserID = req.body.UserID
        let SerialNumber = req.body.SerialNumber
        let Status = req.body.Status

        /* Call mowerInterface to create new Mower */
        mowerInterface.createMower(UserID, SerialNumber, Status, function(errors, MowerID) {

            if (errors) {
                res.send(errors)
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
        mowerInterface.updateMowerStatus(MowerID, Status, function(errors, newMowerStatus) {

            if (errors) {
                res.send(errors)
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
        mowerInterface.deleteMower(MowerID, function(errors, mowerDeleted) {
            if (errors) {
                res.send(errors)
            }
            else {
                res.send(mowerDeleted)
            }
        })
    })

    return router
}