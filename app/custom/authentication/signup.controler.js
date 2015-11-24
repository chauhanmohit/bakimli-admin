(function() {
    'use strict';

    angular.module('bakimliAuth').controller('SignupController', [
        '$log', '$timeout', '$q', '$state', '$stateParams', 'WizardHandler',
        'AuthFactory', 'AuthorizationFactory', 'APIFormat',
        'Salons', 'Districts', 'Professionals', signupCtrl
        ]);

    function signupCtrl(
            $log, $timeout, $q, $state, $stateParams, WizardHandler,
            authFactory, authorization, apiFormat,
            salons, districts, professionals) {
        var self = this, userCreated = false, professionalCreated = false;
        $timeout(function () {
            if (authFactory.isAuthenticated() && !authorization.hasProfile()) {
                userCreated = true;
                WizardHandler.wizard().goTo(1);
            } else if (authorization.hasProfile()) {
                userCreated = professionalCreated = true;
                WizardHandler.wizard().goTo(3);
            }
        }, 500);

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
            if (userCreated) {
                return true;
            }
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

        self.finishSignup = function () {
            if (userCreated && professionalCreated) {
                return;
            }
            var professionalPromise;
            if (!userCreated) {
                professionalPromise = authFactory.signup(self.user).then(function () {
                    userCreated = true;
                    var professionalModel = prepareProfessionalModel(self.user.name, self.professional, self.contactInfo);
                    return professionals.create(professionalModel);
                }, function (response) {
                    // TODO: add user-friendly output
                    userCreated = false;
                    $log.debug('Signup error ', response);
                });
            } else {
                var professionalModel = prepareProfessionalModel(self.user.name, self.professional, self.contactInfo);
                professionalPromise = professionals.create(professionalModel);
            }
            return professionalPromise.then(function () {
                professionalCreated = true;
                $state.go('app.dashboard');
            }, function (response) {
                // TODO: add user-friendly validation
                if (response.status === 400) {
                    UIkit.notify({
                        message: 'Please check your basic and contact info. Provide a valid phone number and address.',
                        status: 'warning',
                        timeout: 5000
                    });
                }
                $log.debug('Error while saving professional ', response.status, response.data);
                professionalCreated = false;
            });
        };

        self.canEnterUserInfo = function () {
            return !userCreated;
        };
        self.canEnterBasicInfo = function () {
            return !professionalCreated;
        };
        self.canEnterContactInfo = self.canEnterBasicInfo;
        self.canEnterStatus = function () {
            return userCreated && professionalCreated;
        };
    }

    function prepareProfessionalModel(name, basicInfo, contactInfo) {
        var model = {
            name: name
        };
        model = angular.extend(model, basicInfo);
        model.phone = contactInfo.phone;
        model.address = angular.copy(contactInfo);
        if (!model.address.postal_code) {
            model.address.postal_code = '';
        }
        return model;
    }
})();