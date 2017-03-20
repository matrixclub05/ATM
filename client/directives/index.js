/**
 * Created by VNemyrovskyi on 3/20/2017.
 */
(function () {
    'use strict';
    var directives = angular.module('directives', []);

    /**
     * Checks if date is expired
     */
    function checkExpirationDate() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attr, ngModel) {
                var expDate = parseInt(attr.expdate);
                ngModel.$setValidity('expdate', (expDate > new Date().getTime()));
            }
        };
    }

    directives.directive('checkdate', checkExpirationDate);

    module.exports = directives;
    
})();