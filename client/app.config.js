(function () {
    'use strict';

    Config.$inject = ['$stateProvider', '$urlRouterProvider', 'USER_ROLES'];

    function Config($stateProvider, $urlRouterProvider, USER_ROLES) {

        $urlRouterProvider.otherwise('login');

        $stateProvider
            .state('base', {
                abstract: true,
                url: '',
                template: '<div ui-view></div>',
                controller: require('./controllers/main'),
                authenticate: false
            })
            .state('login', {
                parent: 'base',
                url: '/login',
                template: require('./views/login.tpl.html'),
                authenticate: false,
                controller: require('./controllers/login')
            })
            .state('admin', {
                parent: 'base',
                url: '/admin',
                template: require('./views/common.tpl.html'),
                controller: require('./controllers/user'),
                authenticate: true,
                data: {authorizedRoles: [USER_ROLES.admin]}
            })
            .state('normal', {
                parent: 'base',
                url: '/user',
                template: require('./views/common.tpl.html'),
                controller: require('./controllers/user'),
                authenticate: true,
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.common]
                }
            });
    }
    module.exports = Config;
})();