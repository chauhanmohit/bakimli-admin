(function() {
    'use strict';

    angular.module('bakimliProfessionals').controller('PhotosController', [
        'ProfessionalPhotos', 'professional', photosCtrl
        ]);

    function photosCtrl(professionalPhotos, professional) {
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

        self.removePhoto = function(photo) {
            UIkit.modal.confirm("Are you sure?", function(){
                professionalPhotos.remove({photoId: photo.pk}).$promise.then(function() {
                    setupPhotos();
                });
            });
        };

        self.editPhoto = function(photo) {
            UIkit.modal.prompt("Description", photo.description, function(newDescription) {
                if (newDescription === photo.description) {
                    return;
                }
                professionalPhotos.update({photoId: photo.pk}, {description: newDescription}).$promise.then(function() {
                    setupPhotos();
                });
            });
        };

        setupPhotos();
    }
})();