'use strict';

/**
 * @ngdoc function
 * @name angularJsFirebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularJsFirebaseApp
 */
angular.module('angularJsFirebaseApp')
  .controller('MainCtrl', function ($scope, $timeout) {
    var rootRef = new Firebase('https://glowing-torch-4779.firebaseio.com/');
    var childRef = rootRef.child('message');

    childRef.on('value', function(snapshot){
      $timeout(function(){
        snapshot.forEach(function(item) {
          console.log(item.name() + ' - ' + item.val());
          console.log(item.ref());
        });
        // console.log(snapshot.hasChildren());
        // console.log(snapshot.hasChild('text'));
        // console.log(snapshot.name());
        // console.log(snapshot.numChildren());
        var snapshotVal = snapshot.val();
        console.log(snapshotVal);
        $scope.message = snapshotVal;
      });
    });

    $scope.$watch('message.text', function(newVal) {
      if(!newVal){
        return;
      }

      childRef.update({
        text: newVal
      });
    });

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
