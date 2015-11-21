(function() {
    'use strict';

    angular.module('bakimliProfessionals').controller('ProfessionalProfileController', [
        'professional', professionalCtrl
        ]);

    function professionalCtrl(professional) {
        var self = this;

        self.professional = professional;
    }
})();