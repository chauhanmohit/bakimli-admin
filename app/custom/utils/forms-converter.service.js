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
                var value = model[key];
                if (typeof value === 'function') {
                    continue;
                }
                if (typeof value === 'object' && !(value instanceof File)) {
                    value = angular.toJson(value);
                }
                fd.append(key, value);
            }
            return fd;
        };
    }
})();