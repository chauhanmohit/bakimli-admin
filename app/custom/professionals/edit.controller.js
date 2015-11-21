(function() {
    'use strict';

    angular.module('bakimliProfessionals').controller('ProfessionalUpdateController', [
        'Professionals', 'FormUtils', 'Salons', 'Districts', 'professional', professionalCtrl
        ]);

    function professionalCtrl(professionals, formUtils, salons, districts, professional) {
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
            if (professional) {
                professionals.update(model);
            } else {
                professionals.create(model);
            }
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
            salon: professional.salon.pk,
            facebook_url: professional.facebook_url,
            twitter_url: professional.twitter_url,
            instagram_url: professional.instagram_url,
            website_url: professional.website_url,
            phone_number: professional.phone_number,
            address: {
                address: professional.address,
                district: professional.district,
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