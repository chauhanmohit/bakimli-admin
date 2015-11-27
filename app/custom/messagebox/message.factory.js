(function() {
    'use strict';

    angular.module('bakimliMessages').factory('messageService', messagesFactory);

	function messagesFactory($q, $http,$firebaseArray) { 
    	 
    	 var ref = new Firebase("https://testapp113.firebaseio.com/messages");
         var myBaseRef = ref.child("messages").child(AuthService.user.pk);
  	     var myListGroup = $firebaseArray(myBaseRef);
       	return {
    	  	getListMessage: function() {
           
    			//var listRef = $firebaseArray(myBaseRef.child(fromUser));
          var listRef = $firebaseArray(ref);
    			//return listRef.$loaded();
          return listRef;
    		}
    	}
    }
})();
