(function() {
    'use strict';

    angular.module('bakimliAuth').factory('AuthenticationInterceptor', [
        '$rootScope', interceptorFn
        ]);

    function interceptorFn($rootScope) {
        return {
            'request': function (config) {
                if (!config.headers) {
                    config.headers = {};
                }
                if (config.headers.Authorization) {
                    return config;
                }
                if ($rootScope.user && $rootScope.user.token) {
                    config.headers.Authorization = 'Token ' + $rootScope.user.token;
                }
                return config;
            }
        };
    }
})();