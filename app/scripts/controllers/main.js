'use strict';

/**
 * @ngdoc function
 * @name angularJsFirebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularJsFirebaseApp
 */
angular.module('angularJsFirebaseApp')
  .controller('MainCtrl', function ($scope, $timeout, MessageService) {
    var rootRef = new Firebase('https://glowing-torch-4779.firebaseio.com/');
    var messagesRef = rootRef.child('messages');
    var titleRef = rootRef.child('title');

    $scope.currentUser = null;
    $scope.currentText = null;
    $scope.messages = [];


    MessageService.childAdded(function(addedChild) {
      $scope.messages.push(addedChild);
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

    function deleteMessageByName(name){
      for(var i = 0; i < $scope.messages.length; i++){
        var currentMessage = $scope.messages[i];
        if(currentMessage.name === name){
          delete $scope.messages[i];
          break;
        }
      }
    }

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

    $scope.sendMessage = function(){
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };

      var promise = MessageService.add(newMessage);
      promise.then(function(data) {
        console.log(data.key());
      });
    }

    $scope.turnFeedOff = function() {
      MessageService.off();
    };

    $scope.pageNext = function(){
      var lastItem = $scope.messages[$scope.messages.length - 1];
      MessageService.pageNext(lastItem.name, 10).then(function(messages) {
        $scope.messages = messages;
      });
    };

    $scope.pageBack = function(){
      var firstItem = $scope.messages[0];
      MessageService.pageBack(firstItem.name, 10).then(function(messages) {
        $scope.messages = messages;
      });
    };

  });
