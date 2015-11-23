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
                isPrivate: true,
                pageTitle: 'Login'
            }
        });
    }
})();