module.exports = function({}) {

    const exports = {}


    /* Validates parameters of createObstacle */
    exports.createObstacleValidation = function(userId, mowingSessionId, obstaclePosition) {

        const validationErrors = []

        // Check if the userId is a string
        if (typeof userId !== 'string') {
            validationErrors.push('invalidDataType')
        }
        // Check if the obstaclePosition is a array
        if (obstaclePosition instanceof Array == false) {
            validationErrors.push('notAnArray')
        }

        // Check if the mowingSessionId is an integer
        if (isNaN(parseInt(mowingSessionId)) == true) {
            validationErrors.push('invalidDataType')
        }
        return validationErrors
    }



    return exports
}