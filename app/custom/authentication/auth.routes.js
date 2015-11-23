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
            }).state('app.signup', {
                url: '/signup',
                templateUrl: 'app/views/auth/signup-wizard.html',
                controller: 'SignupController as signupCtrl',
                data: {
                    pageTitle: 'Sign Up'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'lazy_parsleyjs'
                        ]);
                    }]
                }
            });
    }]);
})();