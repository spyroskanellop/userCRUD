
module.exports = (sequelize, DataTypes) => {

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
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
    return User;
}