const express = require("express")
const app = express()


module.exports = function({ mobileRouter }) {

    app.get("/", function(request, response) {
        response.send("Backend is working!")
    })

    app.use('/mobile', mobileRouter)

    return app
}