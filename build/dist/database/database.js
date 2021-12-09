"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('usersDB', 'user', 'password', {
    dialect: 'sqlite',
    host: './users.sqlite'
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map