(function() {
    'use strict';

    angular.module('bakimliProfessionals').controller('ProfessionalUpdateController', [
        '$rootScope', '$state', '$stateParams', 'Professionals',
        'FormUtils', 'Salons', 'Districts', 'professional', 'AuthFactory', 'ProfessionalPhotos', professionalCtrl
        ]);

    function professionalCtrl($rootScope, $state, $stateParams, professionals, formUtils,
            salons, districts, professional, authFactory, professionalPhotos) {
        var self = this;

        salons.query(null, function(result) {
            self.salons.data = result.results;
        });

        districts.query(null, function(result) {
            self.districts.data = result.results;
        });

        self.employmentType = {
            option: [
            {id: 1, value: 'free', title: 'I am a freelancer'},
            {id: 2, value: 'salon', title: 'I work at a salon'}
            ],
            config: {
                create: false,
                maxItems: 1,
                placeholder: 'Select...',
                valueField: 'value',
                labelField: 'title',
                searchField: 'title'
            }
        };

        self.salons = {
            data: [],
            config: {
                create: false,
                maxItems: 1,
                placeholder: 'Select...',
                valueField: 'pk',
                labelField: 'name',
                searchField: 'name'
            }
        };

        self.districts = {
            data: [],
            config: {
                create: false,
                maxItems: 1,
                placeholder: 'District',
                valueField: 'pk',
                labelField: 'full_name',
                searchField: 'full_name'
            }
        };

        self.professionalPhoto = 'assets/img/blank.png';

        self.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            var model = self.model;
            if (self.model.photo) {
                model = formUtils.modelToFormData(self.model);
            }
            var saveFn;
            if (professional) {
                saveFn = professionals.update;
            } else {
                saveFn = professionals.create;
            }

            saveFn(model).then(function (result) {
                authFactory.reloadProfile().then(function () {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                });
            }, function (result) {
                console.log(result.status, result.data);
            });
        };

        if (professional) {
            setupProfessional(self, professional);
            if ($rootScope.user.professional.inactive_status === 'needs_approval') {
                self.profileInReview = true;
            } else {
                setupPhotos(professionalPhotos, self, professional);
            }
        } else {
            self.newProfile = true;
        }

        self.removePhoto = function(photo) {
            UIkit.modal.confirm("Are you sure?", function(){
                professionalPhotos.remove({photoId: photo.pk}).$promise.then(function() {
                    setupPhotos(professionalPhotos, self, professional);
                });
            });
        };

        self.editPhoto = function(photo) {
            UIkit.modal.prompt("Description", photo.description, function(newDescription) {
                if (newDescription === photo.description) {
                    return;
                }
                professionalPhotos.update({photoId: photo.pk}, {description: newDescription}).$promise.then(function() {
                    setupPhotos(professionalPhotos, self, professional);
                });
            });
        };
    }

    function setupPhotos (professionalPhotos, ctrl, professional) {
        ctrl.gallery = {
            images: []
        };

        professionalPhotos.query({professional: professional.pk}, function (result) {
            ctrl.gallery.images = result.results;
            ctrl.gallery.total = result.count;
        });
    }

    function setupProfessional(ctrl, professional) {
        ctrl.model = {
            name: professional.name,
            title: professional.title,
            description: professional.description,
            salon: professional.salon ? professional.salon.pk : null,
            facebook_url: professional.facebook_url,
            twitter_url: professional.twitter_url,
            instagram_url: professional.instagram_url,
            website_url: professional.website_url,
            phone_number: professional.phone_number,
            address: {
                address: professional.address,
                district: professional.district.pk,
                postal_code: professional.postal_code
            }
        };

        if (professional.salon) {
            ctrl.employmentType.value = 'salon';
        } else {
            ctrl.employmentType.value = 'free';
        }

        ctrl.professionalPhoto = professional.photo;
    }
})();