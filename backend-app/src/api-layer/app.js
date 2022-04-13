const express = require("express")
const app = express()



module.exports = function({ restRouter, mowerRouter, imageRouter, positionsRouter, mowerInterface, positionsInterface }) {

    app.get("/", function(request, response) {

        response.send("Backend is working!")

    })

    app.get("/test", function(request, response) {

        // mowerInterface.createMower(1, "abc123", true, function(error, MowerID) {

        /*
        mowerInterface.createMower(1, "123ABC", true, function(error, MowerID) {
            console.log(MowerID)


            mowerInterface.getAllMowersByUserId(1, function(error, mowers) {
                console.log(mowers)
            })
        })
        */
        positions = {
            points: [
                [
                    [55.98398, 38.29307],
                    [44.233, 45.8380]
                ]

            ]
        }



        positionsInterface.createPositionsInstance([
            [55.98398, 38.29307],
            [44.233, 45.8380]
        ], 1, function(error, PositionsID) {

            console.log(PositionsID, "haaj")

            const Array = [
                [34.66, 65.858],
                [27.4444, 67.433454]
            ]
            positionsInterface.addMowerPositions(PositionsID, Array, function(error, message) {

                console.log(message)


                positionsInterface.getMowerPositionsByMowerId(1, function(error, positions) {
                    console.log(positions)
                })

            })

        })


        // })


    })


    app.use('/rest', restRouter)
    app.use('/mowers', mowerRouter)
    app.use('/images', imageRouter)
    app.use('/positions', positionsRouter)

    let bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({ extended: false }))

    return app
}