(function() {
    'use strict';
    angular.module('bakimliAuth').directive('validateWzNext', function() {
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
                            $scope.$eval($attrs.next);
                            wizard.next();
                        });
                    }
                });
            }
        };
    });
})();