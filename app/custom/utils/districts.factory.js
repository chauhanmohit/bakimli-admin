(function() {
    'use strict';

    angular.module('bakimliUtils').factory('Districts', [
        '$resource', 'APIFormat', districts
        ]);

    function districts($resource, apiFormat) {
        return $resource(apiFormat.fmtV1url('/districts/'), {}, {
            query: {method: 'GET'}
        });
    }
})();