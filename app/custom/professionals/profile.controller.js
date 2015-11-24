(function() {
    'use strict';

    angular.module('bakimliProfessionals').controller('ProfessionalProfileController', [
        '$state', '$stateParams', 'professional', 'ProfessionalPhotos', professionalCtrl
        ]);

    function professionalCtrl($state, $stateParams, professional, professionalPhotos) {
        var self = this;
        var setupPhotos = function () {
            professionalPhotos.query({professional: professional.pk}, function (result) {
                self.gallery.images = result.results;
                self.gallery.total = result.count;
            });
        };
        
        self.gallery = {
                images: []
            };

        self.professional = professional;
        self.activeTab = $stateParams.view || 'basic';
        setupPhotos();
    }
})();