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
    var titleRef = rootRef.child('title');

    $scope.title = null;
    $scope.currentUser = null;
    $scope.currentText = null;
    $scope.messages = [];

    titleRef.once('value', function(snapshot) {
      $scope.title = snapshot.val();
    });

    messagesRef.on('child_added', function(snapshot){
      $timeout(function(){
        // console.log(snapshot.hasChildren());
        // console.log(snapshot.hasChild('text'));
        // console.log(snapshot.name());
        // console.log(snapshot.numChildren());
        var snapshotVal = snapshot.val();
        $scope.messages.push({
          text: snapshotVal.text,
          user: snapshotVal.user,
          name: snapshot.key()
        });
      });
    });

    messagesRef.on('child_changed', function(snapshot){
      $timeout(function(){
        var snapshotVal = snapshot.val();
        var message = findMessageByName(snapshot.key());
        message.text = snapshotVal.text;
      });
    });

    messagesRef.on('child_removed', function(snapshot){
      $timeout(function(){
        deleteMessageByName(snapshot.key());
      });
    });

    function findMessageByName(name){
      var messageFound = null;

      for(var i = 0; i < $scope.messages.length; i++){
        var currentMessage = $scope.messages[i];
        if(currentMessage.name === name){
          messageFound = currentMessage;
          break;
        }
      }
      return messageFound;
    }

    function deleteMessageByName(name){
      for(var i = 0; i < $scope.messages.length; i++){
        var currentMessage = $scope.messages[i];
        if(currentMessage.name === name){
          delete $scope.messages[i];
          break;
        }
      }
    }

    $scope.sendMessage = function(){
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };

      messagesRef.push(newMessage);
    }

    $scope.turnFeedOff = function() {
      messagesRef.off();
    };


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
