(function() {
    'use strict';

    angular.module('bakimliUtils').factory('APIFormat', [function() {
        var protocol = 'http',
            port = '8001',
            hostname = 'localhost';

        return {
            fmtV1url: function (url) {
                if (url.indexOf('/') !== 0) {
                    url = '/' + url;
                }
                return protocol + '://' + hostname + ':' + port + '/api/v1' + url;
            }
        };
    }]);
})();