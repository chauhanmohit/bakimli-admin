(function() {
    'use strict';

    angular.module('bakimliAuth').controller('SignupController', [
        'Salons', 'Districts', signupCtrl
        ]);

    function signupCtrl(salons, districts) {
        var self = this;

        self.user = {}; // user model
        self.professional = {}; // base professional fields
        self.contactInfo = {}; // contact fields
        self.salons = {
            data: [{pk: '', name: 'Not working at any salon', address: ''}],
            config: {
                create: false,
                allowEmptyOption: true,
                maxItems: 1,
                placeholder: 'Select a salon',
                valueField: 'pk',
                labelField: 'name',
                searchField: ['name', 'address'],
                onChange: function (value) {
                    self.checkSalon(value);
                }
            }
        };

        self.districts = {
            data: [],
            config: {
                create: false,
                maxItems: 1,
                placeholder: 'Select the district',
                valueField: 'pk',
                labelField: 'full_name',
                searchField: 'full_name'
            }
        };

        salons.query(null, function(result) {
            self.salons.data = self.salons.data.concat(result.results);
        });

        districts.query(null, function(result) {
            self.districts.data = result.results;
        });

        self.isUserValid = function () {
            var form = $("#wizard_advanced_form").parsley();
            form.validate();
            return form.isValid();
        };

        self.checkSalon = function (pk) {
            var salon = _.find(self.salons.data, {pk: parseInt(pk)});
            if (salon) {
                self.contactInfo.district = salon.district;
                self.contactInfo.address = salon.address;
                self.contactInfo.postal_code = salon.postal_code;
            } else {
                self.contactInfo.district = null;
                self.contactInfo.address = null;
                self.contactInfo.postal_code = null;
            }
        };
    }
})();