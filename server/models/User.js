/**
 * Created by VNemyrovskyi on 3/18/2017.
 */

var generator = require('creditcard-generator').GenCC;
var randomize = require('randomatic');


var User,
    _ = require('underscore'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    check = require('validator').check;

//generator("VISA", 1)[0],

var users = [
    {

        accountNumber: randomize('0', 20),
        cardNumber: '4916373417920945',
        expDate: new Date('11/01/2018').getTime(),
        pin: 1111,
        username: "Admin",
        balance: 1000000,
        role: 'admin',
        accessLevel: 2
    },
    {
        accountNumber: randomize('0', 20),
        cardNumber: '4539616853437270',
        expDate: new Date('10/01/2018').getTime(),
        pin: 1111,
        username: "Common User",
        balance: 1000000,
        role: 'common',
        accessLevel: 1
    }
];

module.exports = {
    accessLevel: {
        common: 1,
        admin: 2
    },

    /**
     * Creates user
     * @param cardNumber
     * @param pin
     * @param role
     * @param expDate
     * @param accessLevel
     * @param callback
     * @return {*}
     */
    addUser: function (cardNumber, pin, role, expDate, accessLevel, callback) {
        if (this.findOne(cardNumber) !== undefined)  return callback("UserAlreadyExists");

        var user = {
            accountNumber: randomize('0', 20),
            cardNumber: cardNumber,
            expDate: expDate,
            pin: pin,
            role: role,
            accessLevel: accessLevel
        };
        users.push(user);
        callback(null, user);
    },

    /**
     * Find all users
     * @return {*}
     */
    findAll: function () {
        return _.map(users, function (user) {
            return _.clone(user);
        });
    },

    /**
     * Returns link to users array
     * @param cardNumber
     * @returns {*}
     */
    findNative: function (cardNumber) {
        return _.find(users, function (user) {
            return user.cardNumber === cardNumber;
        });
    },

    /**
     * Finds single user by card number
     * @param cardNumber
     * @returns {*}
     */
    findOne: function (cardNumber) {

        return _.clone(_.find(users, function (user) {
            return user.cardNumber === cardNumber;
        }));
    },

    validate: function (user) {

        check(user.cardNumber, 'Username must be 1-20 characters long').len(1, 20);
        check(user.pin, 'Password must be 5-60 characters long').len(5, 60);
        check(user.username, 'Invalid username').not(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);

        // TODO: Seems node-validator's isIn function doesn't handle Number arrays very well...
        // Till this is rectified Number arrays must be converted to string arrays
        // https://github.com/chriso/node-validator/issues/185
        var stringArr = _.map(_.values(userRoles), function (val) {
            return val.toString()
        });
        check(user.role, 'Invalid user role given').isIn(stringArr);
    },

    localStrategy: function () {
        return new LocalStrategy({
                usernameField: 'cardNumber',
                passwordField: 'pin'
            },

            function(cardNumber, pin, done) {

                var user = module.exports.findOne(cardNumber, pin);

                if(!user) {
                    done(null, false, { message: 'Incorrect username.' });
                }
                else if(user.pin != pin) {
                    done(null, false, { message: 'Incorrect username.' });
                }
                else {
                    return done(null, user);
                }

            })

    },



    serializeUser: function (user, done) {
        done(null, user.cardNumber);
    },

    deserializeUser: function (cardNumber, done) {

        var user = module.exports.findOne(cardNumber);

        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    }
};
