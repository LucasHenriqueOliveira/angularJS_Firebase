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
    var messagesRef = rootRef.child('messages');

    $scope.currentUser = null;
    $scope.currentText = null;

    messagesRef.on('value', function(snapshot){
      $timeout(function(){
        // console.log(snapshot.hasChildren());
        // console.log(snapshot.hasChild('text'));
        // console.log(snapshot.name());
        // console.log(snapshot.numChildren());
        var snapshotVal = snapshot.val();
        $scope.messages = snapshotVal;
      });
    });

    $scope.sendMessage = function(){
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };

      messagesRef.push(newMessage);
    }


    /*

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

    */
  });
