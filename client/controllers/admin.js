/**
 * Created by VNemyrovskyi on 3/20/2017.
 */
(function () {
    'use strict';

    AdminController.$inject = ['$scope', 'Admin'];

    function AdminController($scope, Admin) {
        Admin.getAllUsers().then(function (data) {
            $scope.users = data;
        });
        $scope.$on('destroy', function () {
            $scope.users = {};
        })
    }

    module.exports = AdminController;
})();