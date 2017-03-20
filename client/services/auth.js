/**
 * Created by VNemyrovskyi on 3/18/2017.
 */
(function () {
    'use strict';

    AuthService.$inject = ['$http', 'Session', '$q'];

    function AuthService($http, Session, $q) {


        function isAuthenticated() {
            return !!Session.id;
        }
        function isAuthorized(authorizedRoles) {

            return (isAuthenticated());
        }

        return {
            redirect: true,
            newSession: function (user) {

                Session.create(user);

                return user;
            },

            logout: function () {

                var deferred = $q.defer();

                var token = Session.id;
                Session.destroy();
                $http({
                    method: 'POST',
                    url: '/logout', data: {token: token}
                }).then(function () {

                    deferred.resolve(true);
                }).catch(function () {
                    deferred.reject(false)
                });
                return deferred.promise;
            },

            isAdmin: function () {
                return !!Session.id && (Session.role === USER_ROLES.admin);
            },

            isAuthenticated: isAuthenticated,

            isAuthorized: isAuthorized
        }

    }


    module.exports = AuthService;
})();