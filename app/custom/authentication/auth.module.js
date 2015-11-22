(function() {
    'use strict';

    angular.module('bakimliAuth', [
        'ui.router',
        'ngStorage',
        'bakimliUtils'
        ]).run(['$rootScope', '$state', '$log', 'AuthFactory', 'AuthorizationFactory', runFn]);

    function runFn($rootScope, $state, $log, authFactory, authorization) {
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
            if (!stateTo.data.permissions) {
                return;
            }
            var permissionMatch = authorization.hasPermissionForState(stateTo, paramsTo);
            if (permissionMatch && !permissionMatch.status) {
                event.preventDefault();
                var redirectToState = 'login';
                if (typeof stateTo.data.redirectTo === 'string') {
                    redirectToState = stateTo.data.redirectTo;
                } else if (typeof stateTo.data.redirectTo === 'object' && stateTo.data.redirectTo.hasOwnProperty(permissionMatch.permission)) {
                    redirectToState = stateTo.data.redirectTo[permissionMatch.permission];
                }
                $log.debug('User ', $rootScope.user, ' has no permission <', permissionMatch.permission, '> for the state ', stateTo.name, '. Redirecting to ', redirectToState);
                $state.go(redirectToState);
                return;
            }
        });
    }
})();