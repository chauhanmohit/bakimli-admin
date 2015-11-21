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
                pageTitle: 'Professionals',
                permissions: ['HAS_PROFILE']
            },
            abstract: true
        }).state('restricted.professionals.profile', {
            url: '/profile',
            templateUrl: '/app/views/professionals/profile.html',
            controller: 'ProfessionalProfileController as professionalCtrl',
            data: {
                pageTitle: "Professional's profile",
                redirectTo: 'restricted.professionals.edit',
                permissions: ['HAS_PROFILE', 'IS_APPROVED']
            },
            resolve: {
                professional: ['$rootScope', 'Professionals', function ($rootScope, professionals) {
                    return professionals.get($rootScope.user.professional.pk);
                }]
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
                }],
                professional: ['$rootScope', 'Professionals', function ($rootScope, professionals) {
                    if ($rootScope.user.professional) {
                        return professionals.get($rootScope.user.professional.pk);
                    } else {
                        return null;
                    }
                }]
            }
        });
    }
})();