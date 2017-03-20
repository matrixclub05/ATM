/**
 * Created by VNemyrovskyi on 3/20/2017.
 */
(function () {
    'use strict';

    LoginController.$inject = ['$scope', 'loginFactory' ];

    function LoginController($scope, loginFactory) {

        $scope.user = {
            cardNumber: null,
            pin: null
        };

        $scope.login = function () {

            loginFactory.login($scope.user).then(function (user) {
                $scope.setUser(user);

            });
        }

    }
    module.exports = LoginController;
})();