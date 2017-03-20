/**
 * Created by VNemyrovskyi on 3/18/2017.
 */
var passport = require('passport'),
    User = require('../models/User.js');

module.exports = {
    register: function (req, res, next) {
        try {

            User.validate(req.body);
        }
        catch (err) {
            return res.send(400, err.message);
        }

        User.addUser(req.body.cardNumber, req.body.pin, req.body.role, function (err, user) {
            if (err === 'UserAlreadyExists') {
                return res.send(403, "User already exists");
            } else if (err) {
                return res.send(500);
            }

            req.logIn(user, function (err) {
                if (err) {
                    next(err);
                }
                else {
                    res.status(200).json({
                        role: user.role,
                        cardNumber: user.cardNumber
                    });
                }
            });
        });
    },

    login: function (req, res, next) {

        passport.authenticate('local',

            function (err, user) {

                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.sendStatus(400);
                }

                req.logIn(user, function (err) {

                    if (err) {
                        return next(err);
                    }

                    req.session.cookie.maxAge = 1000 * 60 * 5;

                    res.status(200).json({
                        accountNumber: user.accountNumber,
                        cardNumber: user.cardNumber,
                        role: user.role,
                        expDate: user.expDate,
                        username: user.username,
                        balance: user.balance
                    });
                });
            })(req, res, next);
    },

    logout: function (req, res) {
        req.logout();
        res.sendStatus(200);
    }
};