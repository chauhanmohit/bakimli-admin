(function() {
    'use strict';

    angular.module('bakimliProfessionals').factory('Professionals', [
        '$q', '$http', 'APIFormat', '$rootScope', professionalsFactory
        ]);

    function professionalsFactory($q, $http, apiFormat, $rootScope) {
        var createNewProfessional = function (data) {
                var deferred = $q.defer();
                var options = null;
                if (data instanceof FormData) {
                    options = {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    };
                }
                $http.post(apiFormat.fmtV1url('/professionals/'), data, options).then(function(response) {
                    if (response.status !== 201) {
                        deferred.reject(response);
                    }
                    deferred.resolve(response.data);
                }, function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            },
            updateProfessional = function (data) {
                var deferred = $q.defer();
                $http.put($rootScope.user.professional.url, data).then(function (response) {
                    deferred.resolve(response.data);
                }, function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;                
            },
            getProfessional = function (professionalId) {
                var deferred = $q.defer();
                $http.get(apiFormat.fmtV1url('/professionals/' + professionalId + '/')).then(function (response) {
                    deferred.resolve(response.data);
                }, function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            },
            getProfessional = function () {
                var deferred = $q.defer();
                $http.get("https://clonex.herokuapp.com/api/v1/professionals").then(function (response) {
                    deferred.resolve(response.data);
                }, function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };

        return {
            create: createNewProfessional,
            get: getProfessional,
            update: updateProfessional
        };
    }
})();