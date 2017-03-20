/**
 * Created by VNemyrovskyi on 3/18/2017.
 */
(function () {
    'use strict';

    Admin.$inject = ['$http', '$q'];

    function Admin($http, $q) {

        function getAllUsers() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/users'
            }).then(function (data) {
                deferred.resolve(data.data);
            }).catch(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return {
            getAllUsers: getAllUsers
        }
    }

    module.exports = Admin;
})();