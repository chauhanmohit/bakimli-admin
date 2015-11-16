(function() {
    'use strict';

    angular.module('bakimliAuth').factory('AuthFactory', [
        authFactory
        ]);

    function authFactory() {
        return {
            isAuthenticated: function() {
                return false;
            }
        };
    }
})();