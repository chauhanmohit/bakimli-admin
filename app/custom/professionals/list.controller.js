(function() {
    'use strict';

    angular.module('bakimliProfessionals').controller('ProfessionalListController', [
        'professional', professionalCtrl
        ]);

    function professionalCtrl(professional) {
        var self = this;

        self.professional = professional.results;
    }
})();