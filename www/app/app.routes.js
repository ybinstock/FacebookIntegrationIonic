angular.module('starter')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/layout/sidemenu.html'
    });

    $urlRouterProvider.otherwise('/app/sessionCreate');
});