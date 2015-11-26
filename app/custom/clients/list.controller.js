(function() {
    'use strict';
 
    angular.module('bakimliClients').controller('ClientListController', ['$scope',
        'client','$http', clientCtrl
        ]);
    
    function clientCtrl($scope,clientsList,$http) {
         var self = this;
         self.client = clientsList.results;
         $scope.total = clientsList.count;
         $scope.next_url = clientsList.next;https: 
         var pageNoinitial = $scope.next_url.substr($scope.next_url.lastIndexOf('=') + 1);
         self.loadmore = function(){
            if($scope.next_url!==''){
                if($scope.total > 10){
                    $http.get($scope.next_url).then(function(res){
                       $scope.keywords = ''; 
                	   self.client = res.data.results;
                	   $scope.next_url = res.data.next;
                        if($scope.next_url === null){
                        $scope.total = $scope.total / 10*pageNoinitial;
                	   }else if($scope.next_url!== null){
                        var pageNo = $scope.next_url.substr($scope.next_url.lastIndexOf('=') + 1);
                        $scope.total = $scope.total / 10*pageNo;
                }
            })
         }
     }else{
            console.log('No data Found!!');
         }	

       }
    }
							     
})();

