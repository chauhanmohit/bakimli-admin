(function() {
    'use strict';

    angular.module('bakimliAuth').controller('SignupController', [
        '$q', 'APIFormat', 'Salons', 'Districts', signupCtrl
        ]);

    function signupCtrl($q, apiFormat, salons, districts) {
        var self = this;

        self.emailValidationURL = apiFormat.fmtV1url('/auth/check-email/');
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
            var deferred = $q.defer();
            var form = $("#wizard_advanced_form").parsley();
            form.whenValidate().then(function () {
                deferred.resolve(true);
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
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