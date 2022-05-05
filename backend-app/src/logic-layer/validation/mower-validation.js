module.exports = function({}) {

    const exports = {}

    /* Validates parameters of createMower */
    exports.createMowerValidation = function(userId, mowerId, status) {
        const validationErrors = []

        // Check if the userId is a string
        if (typeof userId !== 'string') {
            validationErrors.push('invalidDataType')
        }

        // Check if the mowerId is a string
        if (typeof mowerId !== 'string') {
            console.log(typeof mowerId)
            validationErrors.push('invalidDataType')
        }

        // Check if the status is valid

        switch (status) {
            case "start bt":
            case "start auto":
            case "stop":
                break;
            default:
                validationErrors.push('invalidStatus')
                break;
        }
        return validationErrors
    }




    /* Validates parameters of getMowerByMowerId */
    exports.getMowerByMowerIdValidation = function(userId, mowerId) {

        const validationErrors = []

        // Check if the userId is a string
        if (typeof userId !== 'string') {
            validationErrors.push('invalidDataType')
        }
        // Check if the mowerId is a string

        if (typeof mowerId !== 'string') {
            console.log(typeof mowerId)
            validationErrors.push('invalidDataType')
        }
        return validationErrors
    }




    /* Validates parameters of getAllMowersByUserId */
    exports.getAllMowersByUserIdValidation = function(userId) {

        const validationErrors = []

        // Check if the userId is a string
        if (typeof userId !== 'string') {
            validationErrors.push('invalidDataType')
        }
        // Check if the userId is a string
        if (typeof userId !== 'string') {
            validationErrors.push('invalidDataType')
        }
        return validationErrors

    }




    /* Validates parameters of updateMowerStatus */
    exports.updateMowerStatusValidation = function(userId, mowerId, status) {

        const validationErrors = []

        // Check if the userId is a string
        if (typeof userId !== 'string') {
            validationErrors.push('invalidDataType')
        }
        // Check if the mowerId is a string
        if (typeof mowerId !== 'string') {
            console.log(typeof mowerId)
            validationErrors.push('invalidDataType')
        }

        // Check if the status is valid
        switch (status) {
            case "start bt":
            case "start auto":
            case "stop":
                break;
            default:
                validationErrors.push('invalidStatus')
                break;
        }

        return validationErrors
    }




    /* Validates parameters of deleteMower */
    exports.deleteMowerValidation = function(userId, mowerId) {

        const validationErrors = []

        // Check if the userId is a string
        if (typeof userId !== 'string') {
            validationErrors.push('invalidDataType')
        }

        // Check if the mowerId is a string

        if (typeof mowerId !== 'string') {
            console.log(typeof mowerId)
            validationErrors.push('invalidDataType')
        }

        return validationErrors
    }


    return exports
}