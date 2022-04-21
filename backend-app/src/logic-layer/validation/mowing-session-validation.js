module.exports = function({}) {

    const exports = {}

    /* Validates parameters of createMowingSession */
    exports.createMowingSessionValidation = function(mowerPositions, mowerId) {

        const validationErrors = []

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

        // Check if the mowerId is an integer
        if (Number.isInteger(mowerId) == false) {
            validationErrors.push('invalidDataType')
        }

        return validationErrors
    }




    /* Validates parameters of addMowerPositions */
    exports.addMowerPositionsValidation = function(mowingSessionId, newMowerPositions) {

        const validationErrors = []

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
        if (Number.isInteger(mowingSessionId) == false) {
            validationErrors.push('invalidDataType')
        }

        return validationErrors
    }




    /* Validates parameters of getMowerPositionsByMowerId */
    exports.getMowerPositionsByMowerIdValidation = function(mowerId) {

        const validationErrors = []

        // Check if the mowerId is an integer
        if (Number.isInteger(mowerId) == false) {
            validationErrors.push('invalidDataType')
        }

        return validationErrors

    }




    /* Validates parameters of deletePositionData */
    exports.deletePositionDataValidation = function(mowingSessionId) {

        const validationErrors = []

        // Check if the mowerId is an integer
        if (Number.isInteger(mowingSessionId) == false) {
            validationErrors.push('invalidDataType')
        }

        return validationErrors
    }




    return exports
}