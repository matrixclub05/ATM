/**
 * Created by VNemyrovskyi on 3/20/2017.
 */
(function () {
    'use strict';

    ErrorController.$inject = ['$scope', '$state', '$stateParams', '$interval'];

    function ErrorController($scope, $state, $stateParams, $interval) {

        $scope.credsError = $stateParams.credsError;
        $scope.timeToExit = 10;
        var intervalToken = $interval(function () {

            $scope.timeToExit -= 1;
            if($scope.timeToExit === 0){
                stopTimer();
                $state.go('login');
            }
        }, 1000);

        $scope.$on('$destroy', function() {
            stopTimer();
        });

        $scope.back = function () {
            $state.go('login');
        };

        function stopTimer() {
            $interval.cancel(intervalToken);
        }

    }

    module.exports = ErrorController;

})();