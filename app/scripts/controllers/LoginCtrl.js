/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('angularJsFirebaseApp')
    .controller('LoginCtrl', function($scope, FBURL, $window, $rootScope) {
      var fbRef = new Firebase(FBURL);
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
      $scope.errors = [];
      $scope.user = {
        email: '',
        password: ''
      };

      $scope.login = function() {
        $scope.errors = [];

        if ($scope.user.email === '') {
          $scope.errors.push('Please enter your email');
        }

        if ($scope.user.password === '') {
          $scope.errors.push('Please enter your password');
        }

        if ($scope.errors.length > 0) {
          return;
        }

        var promise = $scope.simpleLogin.login('password', {
          email: $scope.user.email,
          password: $scope.user.password
        });

        promise.then(function(user) {
          console.log(user);
          $rootScope.user = user;
          $window.location.href = '/#/main';
        }, function(error) {
          console.error(error);
          if (error.code === 'INVALID_EMAIL') {
            $scope.errors.push('The email was invalid');
          }
          if (error.code === 'INVALID_PASSWORD') {
            $scope.errors.push('The password was invalid');
          }
        });

      };

    });

}(window.angular));
