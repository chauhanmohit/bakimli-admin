(function() {
    'use strict';

    angular.module('bakimliProfessionals').controller('ProfessionalUpdateController', [
        'Professionals', 'FormUtils', 'Salons', 'Districts', professionalCtrl
        ]);

    function professionalCtrl(professionals, formUtils, salons, districts) {
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