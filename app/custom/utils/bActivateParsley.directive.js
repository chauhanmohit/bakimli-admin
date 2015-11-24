(function() {
    'use strict';

    angular.module('bakimliUtils').directive('bActivateParsley', [
        parsleyDirective
        ]);

    function parsleyDirective() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var $form = $(element).parsley();
                $form.on('form:submit', function (form) {
                    form.submitEvent.preventDefault();
                    return false;
                });
                $form.on('form:validated',function() {
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