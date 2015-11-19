(function() {
    'use strict';

    angular.module('bakimliUtils').service('FormUtils', [
        formUtils
        ]);

    function formUtils() {
        var self = this;


        self.modelToFormData = function (model) {
            var fd = new FormData();
            for (var key in model) {
                if (!model.hasOwnProperty(key)) {
                    continue;
                }
                if (typeof model[key] === 'function') {
                    continue;
                }
                fd.append(key, model[key]);
            }
            return fd;
        };
    }
})();