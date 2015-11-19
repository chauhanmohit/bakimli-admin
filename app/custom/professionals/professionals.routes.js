(function() {
    'use strict';

    angular.module('bakimliProfessionals').config([
        '$stateProvider', configFn
        ]);

    function configFn($stateProvider) {
        $stateProvider.state("restricted.professionals", {
            url: "/professionals",
            template: '<ui-view />',
            data: {
                pageTitle: 'Professionals'
            },
            abstract: true
        }).state('restricted.professionals.profile', {
            url: '/profile',
            templateUrl: '/app/views/professionals/profile.html',
            controller: 'ProfessionalProfileController as professionalCtrl',
            data: {
                pageTitle: "Professional's profile",
                permissions: ['HAS_PROFILE', 'IS_APPROVED'],
                redirectTo: 'restricted.professionals.edit'
            }
        }).state('restricted.professionals.edit', {
            url: '/edit',
            templateUrl: '/app/views/professionals/edit.html',
            controller: 'ProfessionalUpdateController as professionalCtrl',
            data: {
                pageTitle: "Professional's profile"
            },
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'lazy_parsleyjs'
                    ]);
                }]
            }
        });
    }
})();