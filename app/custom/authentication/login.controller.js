(function() {
    'use strict';

    angular.module('bakimliAuth').controller('LoginController', [
        '$scope', 'AuthFactory', '$state', 'utils', loginCtrl
        ]);

    function loginCtrl($scope, authFactory, $state, utils) {
        console.log(utils);
        var self = this;

        self.login = function(form) {
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

        self.registerFormActive = false;

        var $login_card = $('#login_card'),
            $login_form = $('#login_form'),
            $login_help = $('#login_help'),
            $register_form = $('#register_form'),
            $login_password_reset = $('#login_password_reset');

        // show login form (hide other forms)
        var login_form_show = function() {
            $login_form
                .show()
                .siblings()
                .hide();
        };

        // show register form (hide other forms)
        var register_form_show = function() {
            $register_form
                .show()
                .siblings()
                .hide();
        };

        // show login help (hide other forms)
        var login_help_show = function() {
            $login_help
                .show()
                .siblings()
                .hide();
        };

        // show password reset form (hide other forms)
        var password_reset_show = function() {
            $login_password_reset
                .show()
                .siblings()
                .hide();
        };

        self.loginHelp = function($event) {
            $event.preventDefault();
            utils.card_show_hide($login_card,undefined,login_help_show,undefined);
        };

        self.backToLogin = function($event) {
            $event.preventDefault();
            self.registerFormActive = false;
            utils.card_show_hide($login_card,undefined,login_form_show,undefined);
        };

        self.registerForm = function($event) {
            $event.preventDefault();
            self.registerFormActive = true;
            utils.card_show_hide($login_card,undefined,register_form_show,undefined);
        };

        self.passwordReset = function($event) {
            $event.preventDefault();
            utils.card_show_hide($login_card,undefined,password_reset_show,undefined);
        };
    }
})();