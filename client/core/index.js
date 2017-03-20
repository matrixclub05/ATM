/**
 * Created by VNemyrovskyi on 3/18/2017.
 */

(function () {
    'use strict';
    var core = angular.module('core', []);

    core.constant('USER_ROLES', {
            admin: 'admin',
            common: 'common'
        })
        .constant('AUTH_EVENTS', {
            loginSuccess: 'login-success',
            loginFailed: 'login-failed',
            logoutSuccess: 'logout-success',
            sessionTimeout: 'session-timeout',
            notAuthenticated: 'not-authenticated',
            notAuthorized: 'not-authorized'

        })
        .config(require('../app.config'))
        .service('Session',require('../services/session'))
        .factory('loginFactory', require('../services/login'))
        .factory('AuthService', require('../services/auth'))
        .factory('Account', require('../services/account'));

    module.exports = core;
})();