/**
 * Created by VNemyrovskyi on 3/18/2017.
 */
(function () {
    'use strict';

    Account.$inject = ['$http', '$q'];

    function Account($http, $q) {

        function withdrawMoney(sum, cardNumber) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/withdraw', data: {sum:sum, cardNumber: cardNumber}
            }).then(function (data) {

                deferred.resolve(data.data);

            }).catch(function (err) {

                deferred.reject(err);

            });

            return deferred.promise;
        }

        return {
            withdrawMoney: withdrawMoney
        }

    }

    module.exports = Account;
})();