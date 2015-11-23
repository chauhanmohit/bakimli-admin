(function() {
    'use strict';

    angular.module('bakimliAuth').controller('SignupController', [
        signupCtrl
        ]);

    function signupCtrl() {
        var self = this;

        self.isUserValid = function () {
            var form = $("#wizard_advanced_form").parsley();
            form.validate();
            return form.isValid();
        };
    }
})();