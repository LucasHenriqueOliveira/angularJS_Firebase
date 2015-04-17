'use strict';

/**
 * @ngdoc function
 * @name angularJsFirebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularJsFirebaseApp
 */
angular.module('angularJsFirebaseApp')
  .controller('MainCtrl', function ($scope) {
    var rootRef = new Firebase('https://glowing-torch-4779.firebaseio.com/');
    var childRef = rootRef.child('message');

    $scope.setMessage = function() {
      childRef.set({
        user: 'Bob',
        text: 'Hi'
      });
    }

    $scope.updateMessage = function() {
      childRef.update({
        lastname: 'Smith'
      });
    }

    $scope.deleteMessage = function() {
      childRef.remove();
    }
  });
