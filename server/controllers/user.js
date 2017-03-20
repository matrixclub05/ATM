/**
 * Created by VNemyrovskyi on 3/18/2017.
 */
var _ = require('underscore'),
    User = require('../models/User.js');


module.exports = {
    /**
     * Returns all users
     * @param req
     * @param res
     */
    index: function (req, res) {
        var users = User.findAll();
        _.each(users, function (user) {
            delete user.pin;
        });
        res.json(users);
    },

    /**
     * Withdraw money from user's account
     * @param req
     * @param res
     * @param next
     */
    withdraw: function (req, res, next) {

        if (req.user) {
            var user = User.findNative(req.user.cardNumber);
            var sum = parseInt(req.body.sum);
            if(user.expDate < new Date().getTime()){
                res.status(400).json({
                    message: 'Your card is expired',
                    balance: user.balance,
                    reqSum: sum
                });
            }
            if (sum <= 0 || (sum % 100 !== 0)) {
                res.status(400).json({
                    message: 'Sum to withdraw must be a multiple of 100',
                    balance: user.balance,
                    reqSum: sum
                });

            } else if (user.balance - sum < 0) {
                res.status(400).json({
                    message: 'The amount of money on your account is not enough to complete request',
                    balance: user.balance,
                    reqSum: sum
                });

            } else {
                user.balance -= sum;

                res.status(200).json({
                    message: 'Please do not forget to remove the card.',
                    balance: user.balance,
                    reqSum: sum
                });
            }


        }
    }
};
