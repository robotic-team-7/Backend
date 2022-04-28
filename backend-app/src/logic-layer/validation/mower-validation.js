module.exports = function({}) {

    const exports = {}

    /* Validates parameters of createMower */
    exports.createMowerValidation = function(userId, serialNumber, status) {
        const validationErrors = []

        // Check if the userId is an integer
        if (isNaN(parseInt(userId)) == true) {
            validationErrors.push('invalidDataType')
        }

        // Check if the serialNumber is a string
        if (typeof serialNumber !== 'string') {
            console.log(typeof serialNumber)
            validationErrors.push('invalidDataType')
        }

        // Check if the status is a boolean
        if (typeof status != 'boolean') {
            console.log(typeof status)
            validationErrors.push('invalidDataType')
        }

        return validationErrors
    }




    /* Validates parameters of getMowerByMowerId */
    exports.getMowerByMowerIdValidation = function(mowerId) {

        const validationErrors = []
            // Check if the mowerId is an integer
        if (isNaN(parseInt(mowerId)) == true) {
            validationErrors.push('invalidDataType')
        }
        return validationErrors
    }




    /* Validates parameters of getAllMowersByUserId */
    exports.getAllMowersByUserIdValidation = function(userId) {

        const validationErrors = []

        // Check if the userId is an integer
        if (isNaN(parseInt(userId)) == true) {
            validationErrors.push('invalidDataType')
        }
        return validationErrors

    }




    /* Validates parameters of updateMowerStatus */
    exports.updateMowerStatusValidation = function(mowerId, status) {

        const validationErrors = []
            // Check if the mowerId is an integer
        if (isNaN(parseInt(mowerId)) == true) {
            validationErrors.push('invalidDataType')
        }

        // Check if the status is a boolean
        if (typeof status !== 'boolean') {
            console.log(typeof status)
            validationErrors.push('invalidDataType')
        }
        return validationErrors
    }




    /* Validates parameters of deleteMower */
    exports.deleteMowerValidation = function(mowerId) {

        const validationErrors = []

        // Check if the mowerId is an integer
        if (isNaN(parseInt(mowerId)) == true) {
            validationErrors.push('invalidDataType')
        }

        return validationErrors
    }


    return exports
}