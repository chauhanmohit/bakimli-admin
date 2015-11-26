(function() {
    'use strict';

    angular.module('bakimliClients').config([
        '$stateProvider', configFn
        ]);

    function configFn($stateProvider) {
        $stateProvider.state("app.clients", {
            url: "/clients",
            template: '<ui-view />',
            data: {
                pageTitle: 'Clients'
            },
            abstract: true
        }).state('app.clients.list', {
            url: '/list',
            templateUrl: '/app/views/client/client_list.html',
            controller: 'ClientListController as clientCtrl',
           data: {
                pageTitle: "Client list",
                redirectTo: 'app.clients.list'
                //permissions: ['', 'IS_APPROVED']
            },
             resolve: { 
                client: ['$rootScope', 'Clients', function ($rootScope, clients) {
                   return clients.get();
               }]
            }
        });
    }
})();