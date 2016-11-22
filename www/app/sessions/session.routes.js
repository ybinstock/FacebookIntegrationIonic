angular.module('starter')
  .config(function($stateProvider) {
    $stateProvider
    .state('sessionCreate', {
      parent: 'app',
      url: '/sessionCreate',
      views: {
        'menuContent': {
          templateUrl: 'app/sessions/session-create.html',
          controller: 'SessionCreateCtrl as sessionCreateCtrl'
        }
      }
    }).state('sessionDetail', {
        parent: 'app',
        url: '/sessionDetail',
        views: {
          'menuContent': {
            templateUrl: 'app/sessions/session-detail.html',
            controller: 'SessionDetailCtrl as sessionDetailCtrl'
          }
        },
        params: {
          access_token: null
        }
      })
  });