/*(function() {
    'use strict';
 
    angular.module('bakimliMessages').controller('MessageBoxController', ['$scope','messageService', 'messages', messageboxCtrl
        ]);
    
    function messageboxCtrl($scope,messageService,messages) {
    
	 $scope.message = {
      text : ''
    };
    $scope.messages = messages;
          
    }
							     
})();

*/
(function() {
    'use strict';
 
    angular.module('bakimliMessages').controller('MessageBoxController', ['$scope','messages', messageboxCtrl
        ]);
    
    function messageboxCtrl($scope,messages) {
    
     
    $scope.messages = messages;
          
    }
                                 
})();

