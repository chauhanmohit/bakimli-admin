(function() {
    'use strict';

    angular.module('bakimliAuth').controller('LoginController', [
        'AuthFactory', '$state', loginCtrl
        ]);

    function loginCtrl(authFactory, $state) {
        var self = this;

        self.submit = function(form) {
            console.log(form);
            if (!form.$valid) {
                return;
            }
            authFactory.login(self.model).then(function (response) {
                $state.go('restricted.home');
            }, function(response) {
                if (response.status === 400) {
                    // Wrong credentials
                }
                // another error
            });
        };
    }
})();