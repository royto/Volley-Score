angular.module('volleyApp', ['ui.router', 'angularCharts', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    'use strict';

    //Set default route
    $urlRouterProvider.otherwise('/');

    //Declare state
    $stateProvider
      .state('home', {
        url : '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .state('todo', {
        url : '/todo',
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl'
      })
      .state('histo', {
        url : '/histo',
        templateUrl: 'views/history.html',
        controller: 'HistoryCtrl'
      })
      .state('stat', {
        url : '/histo/stat/:matchId',
        templateUrl: 'views/stat.html',
        controller: 'StatCtrl'
      })
      .state('match', {
        url : '/match',
        templateUrl: 'views/match.html',
        controller: 'MatchCtrl'
      });

  });
