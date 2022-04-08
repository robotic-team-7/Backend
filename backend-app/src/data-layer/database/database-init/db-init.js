/* initilaizes the database */
const { Sequelize, DataTypes } = require('sequelize');

/* Establishes connection with the database */
const sequelize = new Sequelize('postgres://postgres:mower123@local-db:5432/mower')

/* Checks if the connection was successful */
try {

    sequelize.authenticate();
    console.log('Connection has been established successfully.');

    /* Creates table Mowers */
    const Mowers = sequelize.define('Mowers', {
        MowerID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        SerialNumber: {
            unique: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        Status: {
            primaryKey: true,
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {
        timestamps: false
    });


    /* Syncs all tables with the databse */
    sequelize.sync({ force: true });

    /* Exports the tables so they are accessable for the database-iterface files */
    module.exports = function({}) {

        /* Tables to export */
        const exports = { Mowers }
        return exports
    }



} catch (error) {
    /* Prints error in the console if connection to the database fails */
    console.error('Unable to connect to the database:', error);
}