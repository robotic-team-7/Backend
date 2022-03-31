const express = require("express")
const app = express()


module.exports = function({ restRouter }) {

    app.get("/", function(request, response) {

        response.send("Backend is working!")

    })


    app.use('/rest', restRouter)



    return app
}