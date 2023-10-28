
module.exports = (sequelize, DataTypes) => {

    const Patient = sequelize.define("Patient", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        gender: {
            type: DataTypes.ENUM,
            values: ['male', 'female'],
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail:{
                    msg: 'Must be a valid email address'
                },
                notEmpty: true
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        paranoid: true
    });
        return Patient;
    }