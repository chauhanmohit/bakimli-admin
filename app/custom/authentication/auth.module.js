(function() {
    'use strict';

    angular.module('bakimliAuth', [
        'ui.router',
        'ngStorage',
        'bakimliUtils'
        ]).run(['$rootScope', '$state', 'AuthFactory', runFn]);

    function runFn($rootScope, $state, authFactory) {
        $rootScope.$on('$stateChangeStart', function(event, stateTo, paramsTo, stateFrom, paramsFrom) {
            if (stateTo.data.isPrivate && !authFactory.isAuthenticated()) {
                event.preventDefault();
                $state.go('login');
            }
        });
    }
})();