const express = require("express")
const bodyParser = require('body-parser');
const mobileRouter = require("./mobile/mobile-router");
const app = express()


module.exports = function({ mobileRouter, mowerRouter, imageRouter, positionsRouter }) {
    app.use(bodyParser.json())


    app.get("/", function(request, response) {
        response.send("Backend is working!")
    })




    app.use('/mowers', mowerRouter)
    app.use('/images', imageRouter)
    app.use('/mowing-sessions', mowingSessionRouter)
    app.use('/mobile', mobileRouter)


    app.use(bodyParser.urlencoded({ extended: false }))


    return app
}