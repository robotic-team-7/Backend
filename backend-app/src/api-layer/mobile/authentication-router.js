var express = require('express')

const CognitoService = require('../services/cognito.config')

module.exports = function() {
    const router = express.Router()
    const cognito = new CognitoService();

    router.post('/sign-up', function(request, response) {

        const username = request.body.username
        const password = request.body.password
        const email = request.body.email
        const name = request.body.name
        const family_name = request.body.family_name

        //username = username == undefined ? email.split('@')[0] + (Math.random() + 1).toString(10).substring(7) : username

        let userAttributes = [];
        userAttributes.push({ Name: 'email', Value: email });
        userAttributes.push({ Name: 'name', Value: name });
        userAttributes.push({ Name: 'family_name', Value: family_name });

        cognito.signUpUser(username, password, userAttributes)
            .then(result => {
                if (result === true) {
                    response.status(200).end()
                } else {
                    response.status(400).json({ message: result.message, code: result.code, statusCode: result.statusCode }).end()
                }
            });
    })

    router.post('/forgot-password/:username', function(request, response) {
        const username = request.params.username;
        cognito.forgotPassword(username)
            .then(result => {
                if (result.statusCode === 200) {
                    response.status(200).json(result).end();
                } else {
                    response.status(400).json(result).end();
                }
            })
    })

    router.post('/change-password', function(request, response) {

        const accessToken = request.body.accessToken
        const previousPassword = request.body.previousPassword
        const newPassword = request.body.newPassword

        cognito.changePassword(accessToken, previousPassword, newPassword)
            .then(result => {
                if (result.statusCode === 200) {
                    response.status(200).json(result.data).end();
                } else {
                    response.status(400).json(result).end();
                }
            })
    })

    router.put('/update-user', function(request, response) {

        const accessToken = request.body.accessToken
        const name = request.body.name
        const family_name = request.body.family_name;
        let userAttributes = [];
        userAttributes.push({ Name: 'name', Value: name });
        userAttributes.push({ Name: 'family_name', Value: family_name });

        cognito.updateUserAttributes(accessToken, userAttributes)
            .then(result => {
                if (result.statusCode === 204) {
                    response.status(204).json(result.data).end();
                } else {
                    response.status(400).json(result).end();
                }
            })

    })

    router.post('/confirm-forgot-password', function(req, res) {
        const confirmationCode = request.body.confirmationCode
        const username = request.body.username
        const password = request.body.password;

        cognito.confirmForgotPassword(username, password, confirmationCode)
            .then(result => {
                if (result.statusCode === 200) {
                    response.status(200).json(result).end();
                } else {
                    response.status(400).json(result).end();
                }
            })

    })

    router.post('/sign-in', function(request, response) {

        const username = request.body.username
        const password = request.body.password;

        cognito.signInUser(username, password)
            .then(result => {
                if (result.statusCode == 200) {
                    response.status(200).json(result.data).end()
                } else {
                    response.status(400).json(result).end();
                }
            })
    })

    router.post('/verify', function(request, response) {
        const username = request.body.username;
        const verificationCode = request.body.code;

        cognito.verifyAccount(username, verificationCode)
            .then(result => {
                if (result === true) {
                    response.status(200).end()
                } else {
                    response.status(400).json(result).end()
                }
            })
    })

    router.post('/force-change-password', function(request, response) {
        const username = request.body.username
        const password = request.body.password
        const session = request.body.session;

        cognito.respondToAuthChallenge(username, password, session)
            .then(result => {
                if (result.statusCode === 200) {
                    response.status(200).json(result.data).end();
                } else {
                    response.status(400).json(result).end();
                }
            })
    })

    return router
}