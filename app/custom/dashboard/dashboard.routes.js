(function() {
    'use strict';

    angular.module('bakimliDashboard').config([
        '$stateProvider', configFn
        ]);

    function configFn($stateProvider) {
        $stateProvider.state('app.dashboard', {
            url: '/',
            controller: 'DashboardController as dashboardCtrl',
            templateUrl: '/app/views/dashboard/index.html',
            data: {
                pageTitle: 'Dashboard',
                permissions: ['IS_AUTHENTICATED', 'HAS_PROFILE', 'IS_ACTIVE'],
                redirectTo: {
                    'IS_AUTHENTICATED': 'app.signup',
                    'HAS_PROFILE': 'app.signup',
                    'IS_ACTIVE': 'app.signup'
                }
            }
        });
    }
})();