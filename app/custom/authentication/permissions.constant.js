(function() {
    'use strict';

    angular.module('bakimliAuth').constant('Permissions', {
        ACTIVE: function (user, toState, toParams) {
            if (!(user.professional && typeof user.professional === 'object')) {
                return false;
            }
            if (!user.professional.is_active) {
                return false;
            }
            return true;
        },
        HAS_PROFILE: function (user, toState, toParams) {
            return typeof user.professional === 'object';
        },
        IS_APPROVED: function (user, toState, toParams) {
            return user.professional.is_active && user.professional.inactive_status !== 'needs_approval';
        }
    });
})();