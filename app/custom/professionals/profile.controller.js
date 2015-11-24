(function() {
    'use strict';

    angular.module('bakimliProfessionals').controller('ProfessionalProfileController', [
        '$state', '$stateParams', 'professional', 'ProfessionalPhotos', professionalCtrl
        ]);

    function professionalCtrl($state, $stateParams, professional, professionalPhotos) {
        var self = this;
        self.activeTab = $stateParams.view || 'basic';
        self.professional = professional;
    }
})();