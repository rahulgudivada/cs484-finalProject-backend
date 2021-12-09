import {Model, DataTypes} from 'sequelize'
import sequelize from './database';

class User extends Model{}

User.init({
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  githubId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'user',
  timestamps: false
});

export default User

