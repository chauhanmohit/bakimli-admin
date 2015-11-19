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
        }
    });
})();