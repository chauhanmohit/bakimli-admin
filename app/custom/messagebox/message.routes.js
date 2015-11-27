(function() {
    'use strict';

    angular.module('bakimliMessages').config([
        '$stateProvider', configFn
        ]);

    function configFn($stateProvider) {
        $stateProvider.state("app.messages", {
            url: "/messagebox",
            template: '<ui-view />',
            data: {
                pageTitle: 'Message'
            },
            abstract: true
        }).state('app.messages.list', {
            url: '/messages',
            templateUrl: '/app/views/messagebox/messagebox.html',
            controller: 'MessageBoxController as messageboxCtrl',
           data: {
                pageTitle: "Messages list",
                redirectTo: 'app.messages.list'
                //permissions: ['', 'IS_APPROVED']
            },
        });
    }
})();