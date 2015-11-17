(function() {
    'use strict';

    angular.module('bakimliAuth').factory('AuthFactory', [
        '$localStorage',
        '$rootScope',
        '$q',
        '$http',
        'APIFormat',
        authFactory
        ]);

    function authFactory($localStorage, $rootScope, $q, $http, apiFormat) {
        var checkUser = function() {
            if (typeof $localStorage.user !== 'object') {
                return false;
            }
            if ($rootScope !== $localStorage.user) {
                $rootScope.user = angular.copy($localStorage.user);
            }
            return true;
        },
            setAuthHeaders = function(token) {
                if (token) {
                    $http.defaults.headers.common.Authorization = 'Token ' + token;
                }
            };

        return {
            isAuthenticated: function() {
                return checkUser();
            },
            login: function(credentials) {
                var deferred = $q.defer();
                $http.post(apiFormat.fmtV1url('/api/v1/auth/login/'), credentials).then(function(response) {
                    if (response.status !== 200) {
                        deferred.reject(response);
                        return;
                    }
                    if (typeof response.data !== 'object') {
                        deferred.reject(response);
                        return;
                    }
                    if (typeof response.data.token === 'undefined') {
                        deferred.reject(response);
                        return;
                    }
                    $localStorage.user = angular.copy(response.data);
                    checkUser();
                    setAuthHeaders($localStorage.user.token);
                    deferred.resolve($localStorage.user);
                }, function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            }
        };
    }
})();