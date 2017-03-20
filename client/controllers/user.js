/**
 * Created by VNemyrovskyi on 3/20/2017.
 */
(function () {
    'use strict';

    UserController.$inject = ['$scope', '$rootScope', 'AuthService', 'Account', '$state'];

    function UserController($scope, $rootScope, AuthService, Account, $state) {
        $scope.showModal = false;
        $scope.user = $scope.$parent.currentUser;
        $scope.reqSumIsValid = false;

        $scope.validateSum = function (form) {
            if(form){
                var isValid = $scope.sum >= 0 && ($scope.sum % 100 == 0);
                form.sum.$setValidity("withdraw.sum.$error.format", isValid);
                $scope.reqSumIsValid = isValid;
            }

        };

        $scope.withdrawMoney = function () {
            Account.withdrawMoney($scope.sum, $scope.cardNumber).then(function (info) {

                $rootScope.error = false;
                $rootScope.info = info;
                $scope.user.balance = info.balance;
                $rootScope.showInfoModal = true;

            }).catch(function (err) {

                $rootScope.info = err.data;
                $rootScope.showInfoModal = true;


            })
        };

        $scope.logout = function () {
            AuthService.logout().then(function () {
                $state.go('login');
            })
        }


    }

    module.exports = UserController;
})();