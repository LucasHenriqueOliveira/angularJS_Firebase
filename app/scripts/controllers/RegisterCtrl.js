/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('angularJsFirebaseApp')
    .controller('RegisterCtrl', function($scope, FBURL, $window) {
      var fbRef = new Firebase(FBURL);
      $scope.errors = [];
      $scope.simpleLogin = FirebaseSimpleLogin(fbRef, function(error, user) {
        if (error) {
          // an error occurred while attempting login
          console.log(error);
        } else if (user) {
          // user authenticated with Firebase
          console.log("User ID: " + user.uid + ", Provider: " + user.provider);
        } else {
          // user is logged out
        }
      });
      $scope.registerUser = {
        email: '',
        password: '',
        confirmPassword: ''
      };

      $scope.register = function() {
        var errors = [],
            user = $scope.registerUser;
        if (user.email === '') {
          errors.push('Please enter an email');
        }
        if (user.password === '') {
          errors.push('Password must not be blank');
        }
        else if (user.password !== user.confirmPassword) {
          errors.push('Passwords must match');
        }

        if (errors.length > 0) {
          $scope.errors = errors;
          return;
        }

        var promise = $scope.simpleLogin
          .$createUser(user.email, user.password);

        promise.then(function(user) {
          console.log(user);
          $window.location.href = '/#/chat';
        }, function(error) {
          console.error(error);
        });

      };

    });

}(window.angular));
