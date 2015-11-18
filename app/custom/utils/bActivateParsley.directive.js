(function() {
    'use strict';

    angular.module('bakimliUtils').directive('bActivateParsley', [
        parsleyDirective
        ]);

    function parsleyDirective() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                $(element).parsley().on('form:validated',function() {
                    scope.$apply();
                }).on('field:validated',function(parsleyField) {
                    if($(parsleyField.$element).hasClass('md-input')) {
                        scope.$apply();
                    }
                });
            }
        };
    }
})();