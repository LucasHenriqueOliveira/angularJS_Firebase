/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('angularJsFirebaseApp')
    .controller('LogoutCtrl', function($scope, $firebaseSimpleLogin, FBURL, $window) {
      var fbRef = new Firebase(FBURL);
      $scope.simpleLogin = $firebaseSimpleLogin(fbRef);
      $scope.simpleLogin.$logout();
      $window.location.href = '/#/';
    });

}(window.angular));
