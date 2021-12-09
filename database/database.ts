import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('usersDB', 'user', 'password', {
  dialect: 'sqlite',
  host: './users.sqlite'
});

export default sequelize

