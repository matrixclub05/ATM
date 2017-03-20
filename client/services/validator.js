/**
 * Created by VNemyrovskyi on 3/20/2017.
 */
(function () {
    'use strict';
    function Validator(){

        function withdrawValidate(sum) {
            if (sum <= 0 || (sum % 100 !== 0)) {
                return false;
            }
        }

        function validateExpDate(date) {
            if(date > new Date().getTime()){
                return false;
            }
        }

        return {
            withdrawValidate: withdrawValidate,
            validateExpDate: validateExpDate
        };
    }
    module.exports = Validator;
})();