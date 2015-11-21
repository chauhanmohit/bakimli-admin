(function() {
    'use strict';

    angular.module('bakimliAuth', [
        'ui.router',
        'ngStorage',
        'bakimliUtils'
        ]).run(['$rootScope', '$state', 'AuthFactory', 'AuthorizationFactory', runFn]);

    function runFn($rootScope, $state, authFactory, authorization) {
        authFactory.reloadProfile();
        $rootScope.$on('$stateChangeStart', function(event, stateTo, paramsTo, stateFrom, paramsFrom) {
            if (!stateTo.data) {
                return;
            }
            if (stateTo.data.isPrivate && !authFactory.isAuthenticated()) {
                event.preventDefault();
                $state.go('login');
                return;
            }
            var permissionMatch = authorization.hasPermissionForState(stateTo, paramsTo);
            if (permissionMatch && !permissionMatch.status) {
                event.preventDefault();
                if (typeof stateTo.data.redirectTo === 'string') {
                    $state.go(stateTo.data.redirectTo);
                    return;
                }
                if (typeof stateTo.data.redirectTo === 'object' && stateTo.data.redirectTo.hasOwnProperty(permissionMatch.permission)) {
                    $state.go(stateTo.data.redirectTo[permissionMatch.permission]);
                    return;
                }
                $state.go('login');
                return;
            }
        });
    }
})();