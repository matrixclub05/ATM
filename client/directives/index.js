/**
 * Created by VNemyrovskyi on 3/20/2017.
 */
(function () {
    'use strict';
    var directives = angular.module('directives', []);
    directives.directive('checkdate', function () {
        return {
            require: 'ngModel',
            link: function(scope, elem, attr, ngModel) {
                var expDate = attr.expdate;
                ngModel.$setValidity('expdate', (parseInt(expDate) > new Date().getTime()));
            }
        };
    });

    module.exports = directives;
    
})();