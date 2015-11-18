(function() {
    'use strict';

    angular.module('bakimliAuth').controller('LoginController', [
        '$scope', 'AuthFactory', '$state', loginCtrl
        ]);

    function loginCtrl($scope, authFactory, $state) {
        var self = this;

        self.submit = function(form) {
            console.log(form);
            if (!form.$valid) {
                return;
            }
            authFactory.login(self.model).then(function (response) {
                $state.go('restricted.home');
            }, function(response) {
                var message;
                if (response.status === 400) {
                   message = 'Wrong username or password. Please try again.';
                } else {
                    message = 'An error occurred during request. Please try again.';
                }
                var thisNotify = UIkit.notify({
                    message: message,
                    status: 'danger',
                    timeout: 5000,
                });
            });
        };
    }
})();