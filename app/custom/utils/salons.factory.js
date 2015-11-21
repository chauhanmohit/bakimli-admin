(function() {
    'use strict';

    angular.module('bakimliUtils').factory('Salons', [
        '$resource', 'APIFormat', salons
        ]);

    function salons($resource, apiFormat) {
        return $resource(apiFormat.fmtV1url('/salons/'), {}, {
            query: {method: 'GET'}
        });
    }
})();