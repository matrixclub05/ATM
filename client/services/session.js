/**
 * Created by VNemyrovskyi on 3/18/2017.
 */
(function () {
    'use strict';

    function Session(){
        this.create = function(user){
            this.id = user.accountNumber;
            this.role = user.role;
        };

        this.destroy = function(){
            this.id = null;
            this.role = null;
        };

        return this;

    }
    module.exports = Session;
})();