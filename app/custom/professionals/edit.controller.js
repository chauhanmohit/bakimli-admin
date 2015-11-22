(function() {
    'use strict';

    angular.module('bakimliProfessionals').controller('ProfessionalUpdateController', [
        '$state', '$stateParams', 'Professionals', 'FormUtils', 'Salons', 'Districts', 'professional', 'AuthFactory', professionalCtrl
        ]);

    function professionalCtrl($state, $stateParams, professionals, formUtils, salons, districts, professional, authFactory) {
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
            self.profileInReview = true;
        } else {
            self.newProfile = true;
        }
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