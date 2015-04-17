'use strict';

/**
 * @ngdoc function
 * @name angularJsFirebaseApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularJsFirebaseApp
 */
angular.module('angularJsFirebaseApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
