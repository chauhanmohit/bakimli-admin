(function() {
    'use strict';

    function generateDirective (action) {
        var directiveAction = 'Wz' + action.charAt(0).toUpperCase() + action.slice(1);
        return angular.module('bakimliAuth').directive('validate' + directiveAction, function() {
            return {
                restrict: 'A',
                replace: false,
                require: '^wizard',
                link: function($scope, $element, $attrs, wizard) {

                    $element.on("click", function(e) {
                        e.preventDefault();
                        var $form = $element.parents('form').parsley();
                        $form.validate();
                        if ($form.isValid()) { 
                            $scope.$apply(function() {
                                $scope.$eval($attrs[directiveAction]);
                                wizard[action]();
                            });
                        }
                    });
                }
            };
        });
    }

    generateDirective('next');
    generateDirective('finish');
})();