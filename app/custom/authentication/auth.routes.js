(function() {
    'use strict';

    angular.module('bakimliAuth').config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state("login", {
                url: "/login",
                templateUrl: 'app/views/auth/login.html',
                controller: 'LoginController as loginCtrl',
                data: {
                    pageTitle: 'Login'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'lazy_parsleyjs'
                        ]);
                    }]
                },
            });
    }]);
})();