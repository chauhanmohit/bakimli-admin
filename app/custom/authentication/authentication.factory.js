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
        var checkLocalUser = function() {
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
            },
            validateUser = function (user) {
                if (typeof user !== 'object') {
                    return false;
                }
                if (typeof user.token === 'undefined' || !user.token || !user.token.length) {
                    return false;
                }
                return true;
            },
            setLocalUser = function (user) {
                $localStorage.user = angular.copy(user);
                checkLocalUser();
                setAuthHeaders(user.token);
            };

        return {
            isAuthenticated: function() {
                return checkLocalUser();
            },
            signup: function(profileData) {
                var deferred = $q.defer();
                $http.post(
                    apiFormat.fmtV1url('/auth/signup/'),
                    profileData).then(function (response) {
                        if (response.status !== 201 || !validateUser(response.data)) {
                            deferred.reject(response);
                            return;
                        }
                        deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            },
            resetPassword: function(credentials) {
                var deferred = $q.defer();
                $http.post(
                    apiFormat.fmtV1url('/reset-password/'),
                    credentials).then(function (response) {
                        if (response.status !== 200) {
                            deferred.reject(response);
                            return;
                        }
                        deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            },
            login: function(credentials) {
                var deferred = $q.defer();
                $http.post(apiFormat.fmtV1url('/auth/login/'), credentials).then(function(response) {
                    if (response.status !== 200 || !validateUser(response.data)) {
                        deferred.reject(response);
                        return;
                    }
                    setLocalUser(response.data);
                    deferred.resolve($localStorage.user);
                }, function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            }
        };
    }
})();