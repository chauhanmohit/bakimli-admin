(function() {
    'use strict';

    angular.module('bakimliProfessionals').config([
        '$stateProvider', configFn
        ]);

    function configFn($stateProvider) {
        $stateProvider.state("app.professionals", {
            url: "/professionals",
            template: '<ui-view />',
            data: {
                pageTitle: 'Professionals',
                permissions: ['HAS_PROFILE', 'IS_APPROVED']
            },
            abstract: true
        }).state('app.professionals.profile', {
            url: '/profile?view',
            templateUrl: '/app/views/professionals/profile.html',
            controller: 'ProfessionalProfileController as professionalCtrl',
            data: {
                pageTitle: "Professional's profile"
            },
            resolve: {
                professional: ['$rootScope', 'Professionals', function ($rootScope, professionals) {
                    return professionals.get($rootScope.user.professional.pk);
                }]
            }
        }).state('app.professionals.photos', {
            url: '/photos',
            templateUrl: '/app/views/professionals/photos.html',
            controller: 'PhotosController as photosCtrl',
            data: {
                pageTitle: "Professional's profile"
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
        }).state('restricted.professionals.list', {
            url: '/list',
            templateUrl: '/app/views/professionals/list.html',
            controller: 'ProfessionalListController as professionalCtrl',
            data: {
                pageTitle: "Professional list",
                redirectTo: 'restricted.professionals.list'
                permissions: ['HAS_PROFILE', 'IS_APPROVED']
            },
            resolve: {
                professional: ['$rootScope', 'Professionals', function ($rootScope, professionals) {
                   return professionals.get();
                }]
            }
        });
    }
})();