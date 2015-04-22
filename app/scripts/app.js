'use strict';

/**
 * @ngdoc overview
 * @name angularJsFirebaseApp
 * @description
 * # angularJsFirebaseApp
 *
 * Main module of the application.
 */
angular
  .module('angularJsFirebaseApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .constant('FBURL', 'https://glowing-torch-4779.firebaseio.com/');
