'use strict';
var angular = require('angular');

require('./assets/less/style.less');
require('angular-ui-router');
require('./core');
require('./directives');
require('angular-cookies');

var creditCards = require('angular-credit-cards');

angular.module('ATM', ['ui.router', 'ngCookies', 'core', 'directives', creditCards])

    .run(function ($rootScope, $state, $http, AUTH_EVENTS, AuthService, $interval) {

    $rootScope.$on('$stateChangeStart', function (event, next) {

        if (next.authenticate && !AuthService.isAuthenticated()){
            $state.transitionTo("login");
            event.preventDefault();
        }

        if (next.name !== 'login' && next.name !== 'error') {

            var authorizedRoles = next.data.authorizedRoles;

            if (!AuthService.isAuthorized(authorizedRoles)) {

                event.preventDefault();

                if (AuthService.isAuthenticated()){
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }

                $state.go('login');
            }
        } /*else if (next.name == 'admin' && AuthService.isAdmin()){
            $state.go('admin');
        }*/

    })

});