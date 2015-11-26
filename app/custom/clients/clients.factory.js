(function() {
    'use strict';

    angular.module('bakimliClients').factory('Clients', [
        '$q', '$http', 'APIFormat', '$rootScope', clientsFactory
        ]);

    function clientsFactory($q, $http, apiFormat, $rootScope) { 
           var getClient = function () { 
                var deferred = $q.defer();
                $http.get(apiFormat.fmtV1url('/clients/')).then(function (response) {
                    deferred.resolve(response.data);
                }, function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };
            

        return {
            get: getClient
        };
    }
})();
