const local = require('./localStrategy');
const kakao= require('./kakaoStrategy');
const {User} = require('../models');

module.exports = (passport) => {
    passport.serializeUser(function(user, done){
         done(null, user.id);
    });
     passport.deserializeUser(function(id, done){
         User.findOne({
             where: {id},
            include:[{
                 model: User,
                attributes: ['id', 'nick'],
                as: 'Followers',
            }, {
                 model: User,
                attributes: ['id', 'nick'],
                as: 'Followings',
            }],
         })
             .then(user => done(null, user))
             .catch(err => done(err));
     });
//새로 추가
    local(passport);
    kakao(passport);
};