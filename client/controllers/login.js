/**
 * Created by VNemyrovskyi on 3/20/2017.
 */
(function () {
    'use strict';

    LoginController.$inject = ['$scope', 'loginFactory', '$state' ];

    function LoginController($scope, loginFactory,  $state) {

        $scope.user = {
            cardNumber: null,
            pin: null
        };

        $scope.login = function () {

            loginFactory.login($scope.user).then(function (user) {
                $scope.setUser(user);

            }).catch(function (err) {

                $state.go("error", {
                    credsError: err.data
                });

            });
        }

    }
    module.exports = LoginController;
})();