"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("./database"));
class User extends sequelize_1.Model {
}
User.init({
    googleId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    githubId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    tableName: 'user',
    timestamps: false
});
exports.default = User;
//# sourceMappingURL=User.js.map