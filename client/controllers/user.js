/**
 * Created by VNemyrovskyi on 3/20/2017.
 */
(function () {
    'use strict';

    UserController.$inject = ['$scope', '$rootScope', 'AuthService', 'Account', '$state', '$interval'];

    function UserController($scope, $rootScope, AuthService, Account, $state, $interval) {
        $scope.showModal = false;
        $scope.user = $scope.$parent.currentUser;
        $scope.reqSumIsValid = false;

        $rootScope.timeToExit = 10;

        var intervalToken;

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

                intervalToken = $interval(function () {

                    $rootScope.timeToExit -= 1;
                    if($rootScope.timeToExit === 0){
                        stopTimer();
                        $scope.logout();
                    }
                }, 1000);

            }).catch(function (err) {

                $rootScope.info = err.data;
                $rootScope.showInfoModal = true;


            })
        };

        $scope.logout = function () {
            AuthService.logout().then(function () {
                $state.go('login');
            })
        };

        $scope.$on('$destroy', function() {
            stopTimer();
        });

        function stopTimer() {
            $interval.cancel(intervalToken);
        }

    }

    module.exports = UserController;
})();