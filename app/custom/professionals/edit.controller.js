(function() {
    'use strict';

    angular.module('bakimliProfessionals').controller('ProfessionalUpdateController', [
        'Professionals', 'FormUtils', professionalCtrl
        ]);

    function professionalCtrl(professionals, formUtils) {
        var self = this;

        self.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            var model = self.model;
            if (self.model.photo) {
                model = formUtils.modelToFormData(self.model);
            }
            professionals.create(model);
        };
    }
})();