/**
 * Created by VNemyrovskyi on 3/20/2017.
 */
(function () {
    'use strict';

    LoginController.$inject = ['$scope', '$rootScope', 'loginFactory', '$state' ];

    function LoginController($scope, $rootScope, loginFactory,  $state) {

        $scope.user = {
            cardNumber: null,
            pin: null
        };

        $rootScope.currentUser = $scope.user;

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