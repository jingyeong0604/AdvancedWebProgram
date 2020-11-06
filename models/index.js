var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = requre('./post')(sequelize, Sequelize);
db.Hashtag = requre('./hashtag')(sequelize, Sequelize);
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag'});
db.User.belongsToMany(db.User, {
  foreignKey: 'followingId',
  as: 'Followers',
  through:'Follow',
});
db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'Follow',
});
module.exports = db;
