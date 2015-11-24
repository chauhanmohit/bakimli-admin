(function() {
    'use strict';

    angular.module('bakimliHome').config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('app.home', {
            url: '/home',
            template: '<ui-view />',
            data: {
                pageTitle: 'Home'
            }
        }).state('app.home.help', {
            url: '/help',
            templateUrl: '/app/views/home/help.html',
            controller: 'HelpController as helpCtrl',
            resolve: {
                helpPosts: function($http){
                    return $http({ method: 'GET', url: '/data/help_faq.json' })
                        .then(function (data) {
                            return data.data;
                        });
                }
            }
        });
    }]);
})();