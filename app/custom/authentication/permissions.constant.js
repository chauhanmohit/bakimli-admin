(function() {
    'use strict';

    angular.module('bakimliAuth').constant('Permissions', {
        IS_ACTIVE: function (user, toState, toParams) {
            if (!(user.professional && typeof user.professional === 'object')) {
                return false;
            }
            if (!user.professional.is_active) {
                return false;
            }
            return true;
        },
        IS_AUTHENTICATED: function (user, toState, toParams) {
            return !!user;
        },
        HAS_PROFILE: function (user, toState, toParams) {
            return typeof user.professional === 'object' && user.professional;
        },
        IS_APPROVED: function (user, toState, toParams) {
            return user.professional.is_active && user.professional.inactive_status !== 'needs_approval';
        }
    });
})();