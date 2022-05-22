module.exports = function({}) {

    const exports = {}

    /* Validates parameters of createMowingSession */
    exports.createMowingSessionValidation = function(userId, mowerPositions, mowerId) {

        const validationErrors = []

        // Check if the userId is a string
        if (typeof userId !== 'string') {
            console.log(typeof mowerId)
            validationErrors.push('invalidDataType')
        }
        // Check if the mowerPositions is a array
        if (mowerPositions instanceof Array == false) {
            validationErrors.push('notAnArray')
        }

        // Checks so the arrays contains only numbers
        for (let x = 0; x < mowerPositions.length; x++) {
            for (let y = 0; y < mowerPositions[x].length; y++) {
                if (typeof mowerPositions[x][y] != 'number') {
                    validationErrors.push('invalidDataTypeInArray')
                }
            }
        }

        // Check if the mowerId is a string
        if (typeof mowerId !== 'string') {
            console.log(typeof mowerId)
            validationErrors.push('invalidDataType')
        }
        return validationErrors
    }




    /* Validates parameters of addMowerPositions */
    exports.addMowerPositionsValidation = function(userId, mowingSessionId, newMowerPositions) {

        const validationErrors = []

        // Check if the userId is a string
        if (typeof userId !== 'string') {
            console.log(typeof mowerId)
            validationErrors.push('invalidDataType')
        }
        // Check if the mowerPositions is a array
        if (newMowerPositions instanceof Array == false) {
            validationErrors.push('notAnArray')
        }

        // Checks so the arrays contains only numbers
        for (let x = 0; x < newMowerPositions.length; x++) {
            for (let y = 0; y < newMowerPositions[x].length; y++) {
                if (typeof newMowerPositions[x][y] != 'number') {
                    validationErrors.push('invalidDataTypeInArray')
                }
            }
        }

        // Check if the mowingSessionId is an integer
        if (isNaN(parseInt(mowingSessionId)) == true) {
            validationErrors.push('invalidDataType')
        }

        return validationErrors
    }




    /* Validates parameters of getMowerPositionsByMowerId */
    exports.getAllMowingSessionsByMowerIdValidation = function(userId, mowerId) {

        const validationErrors = []

        // Check if the userId is a string
        if (typeof userId !== 'string') {
            console.log(typeof mowerId)
            validationErrors.push('invalidDataType')
        }
        // Check if the mowerId is a string
        if (typeof mowerId !== 'string') {
            console.log(typeof mowerId)
            validationErrors.push('invalidDataType')
        }
        return validationErrors

    }




    /* Validates parameters of deletePositionData */
    exports.deleteMowingSessionValidation = function(userId, mowingSessionId) {

        const validationErrors = []

        // Check if the userId is a string
        if (typeof userId !== 'string') {
            console.log(typeof mowerId)
            validationErrors.push('invalidDataType')
        }
        // Check if the mowingSessionId is an integer
        if (isNaN(parseInt(mowingSessionId)) == true) {
            validationErrors.push('invalidDataType')
        }

        return validationErrors
    }

    exports.getMowingSessionByMowingSessionIdValidation = function(userId, mowingSessionId) {
        const validationErrors = []

        // Check if the userId is a string
        if (typeof userId !== 'string') {
            console.log(typeof mowerId)
            validationErrors.push('invalidDataType')
        }
        if (isNaN(parseInt(mowingSessionId)) == true) {
            validationErrors.push('invalidDataType')
        }

        return validationErrors
    }




    return exports
}