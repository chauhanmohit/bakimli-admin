(function() {
    'use strict';

    angular.module('bakimliUtils').factory('ProfessionalPhotos', [
        '$resource', 'APIFormat', photosFactory
        ]);

    function photosFactory($resource, apiFormat) {
        return $resource(apiFormat.fmtV1url('/professional-photo-rels/:photoId/'), {
            photoId: '@photoId'
        }, {
            query: {method: 'GET'},
            remove: {method: 'DELETE'},
            update: {method: 'PUT'}
        });
    }
})();