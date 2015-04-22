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
      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/logout', {
        template: 'Logging out...',
        controller: 'LogoutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .constant('FBURL', 'https://glowing-torch-4779.firebaseio.com/')
  .constant('MSGURL', 'https://glowing-torch-4779.firebaseio.com/messages');
