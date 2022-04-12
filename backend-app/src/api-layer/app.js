const express = require("express")
const bodyParser = require('body-parser');
const mobileRouter = require("./mobile/mobile-router");
const app = express()


module.exports = function({ mobileRouter }) {
    app.use(bodyParser.json())


    app.get("/", function(request, response) {
        response.send("Backend is working!")
    })

    app.use('/mobile', mobileRouter)

    return app
}