(function() {
    'use strict';

    angular.module('bakimliUtils').factory('APIFormat', [function() {
        var protocol = 'https',
            port = '8001',
            hostname = 'clonex.herokuapp.com';

        return {
            fmtV1url: function (url) {
                if (url.indexOf('/') !== 0) {
                    url = '/' + url;
                }
                return protocol + '://' + hostname + ':'  + '/api/v1' + url;
            }
        };
    }]);
})();