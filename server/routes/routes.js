/**
 * Created by VNemyrovskyi on 3/18/2017.
 */
var _ = require('underscore'),
    path = require('path'),
    passport = require('passport'),
    AuthCtrl = require('../controllers/auth'),
    UserCtrl = require('../controllers/user'),
    User = require('../models/User.js');

var routes = [

    // Local Auth
    {
        path: '/register',
        httpMethod: 'POST',
        middleware: [AuthCtrl.register]
    },
    {
        path: '/login',
        httpMethod: 'POST',
        middleware: [AuthCtrl.login]
    },
    {
        path: '/logout',
        httpMethod: 'POST',
        middleware: [AuthCtrl.logout]
    },

    // User resource
    {
        path: '/users',
        httpMethod: 'GET',
        middleware: [UserCtrl.index],
        accessLevel: 2
    },
    {
        path: '/withdraw',
        httpMethod: 'POST',
        middleware: [UserCtrl.withdraw],
        accessLevel: 1

    },

    {
        path: '/*',
        httpMethod: 'GET',
        middleware: [function (req, res) {

            var cardNumber, role;

            if(req.user) {
                role = req.user.role;
                cardNumber = req.user.cardNumber;
            }

            res.cookie('user', JSON.stringify({
                cardNumber: cardNumber || '',
                role: role || 'common'
            }));
            res.sendFile(path.join(__dirname, '../../client/build/index.html'));
        }]
    }
];

module.exports = function (app) {

    _.each(routes, function (route) {

        route.middleware.unshift(ensureAuthorized);

        var args = _.flatten([route.path, route.middleware]);

        switch (route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });
};

function ensureAuthorized(req, res, next) {

    var userAccessLevel,
        accessLevel;


    if (!req.user) {
        userAccessLevel = User.accessLevel.common;
    } else {
        userAccessLevel = req.user.accessLevel;
    }
    accessLevel = _.findWhere(routes, {
            path: req.route.path,
            httpMethod: req.route.stack[0].method.toUpperCase()
        }).accessLevel || 1;

    if (accessLevel > userAccessLevel) return res.sendStatus(403);

    return next();
}
