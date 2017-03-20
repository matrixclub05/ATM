/**
 * Created by VNemyrovskyi on 3/20/2017.
 */
(function () {
    'use strict';

    MainController.$inject = ['$scope', '$rootScope', '$location', 'USER_ROLES', 'AuthService'];

    function MainController($scope, $rootScope, $location, USER_ROLES, AuthService) {
        $rootScope.showInfoModal = false;

        $scope.currentUser = null;
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.setUser = function (user) {
            $scope.currentUser = user;
            $rootScope.currentUser = user;
            AuthService.newSession(user);
            $location.path(user.role == USER_ROLES.admin ? '/admin' : '/user');
        };

        $scope.getUser = function () {
            return $scope.currentUser;
        };
    }

    module.exports = MainController;
})();