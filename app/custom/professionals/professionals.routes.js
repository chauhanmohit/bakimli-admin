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
            controller: 'ProfessionalProfileController as profesisonalCtrl',
            data: {
                pageTitle: "Professional's profile"
            }
        }).state('restricted.professionals.edit', {
            url: '/edit',
            templateUrl: '/app/views/professionals/edit.html',
            controller: 'ProfessionalUpdateController as profesisonalCtrl',
            data: {
                pageTitle: "Professional's profile"
            }
        });
    }
})();