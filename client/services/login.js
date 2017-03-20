/**
 * Created by VNemyrovskyi on 3/18/2017.
 */
(function () {
    'use strict';

    loginFactory.$inject = ['$http', '$q'];

    function loginFactory($http, $q) {

        return {
            login: function (user) {

                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: '/login', data: user
                }).then(function (data) {

                    deferred.resolve(data.data);

                }).catch(function (err) {

                    deferred.reject(err);

                });

                return deferred.promise;
            }
        };
    }

    module.exports = loginFactory;

})();