(function() {
    'use strict';

    angular.module('bakimliAuth').factory('AuthorizationFactory', [
        '$rootScope', 'Permissions', authorizationFn
        ]);

    function authorizationFn($rootScope, permissions) {
        var isAnonymous = function () {
                return !$rootScope.user;
            },
            hasAccount = function () {
                return (!isAnonymous()) && $rootScope.user.professional;
            },
            isActive = function () {
                return hasAccount() && $rootScope.user.professional.is_active;
            };
        return {
            hasPermissionForState: function (toState, toParams) {
                var result = true, permission;
                if (toState.data.permissions) {
                    for (var i = 0; i < toState.data.permissions.length; i++) {
                        if (permissions.hasOwnProperty(toState.data.permissions[i])) {
                            result = permissions[toState.data.permissions[i]]($rootScope.user, toState, toParams);
                            if (!result) {
                                permission = toState.data.permissions[i];
                                break;
                            }
                        }
                    }
                }
                return {
                    status: result,
                    permission: permission
                };
            },
            isActive: isActive,
            isAnonymous: isAnonymous
        };
    }
})();