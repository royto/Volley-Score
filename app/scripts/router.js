angular.module('volleyApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    'use strict';

    //Set default route
    $urlRouterProvider.otherwise('/');

    //Declare state
    $stateProvider
      .state('home', {
        url : '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs : 'home'
      })
      .state('todo', {
        url : '/todo',
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl',
        controllerAs : 'todo'
      })
      .state('histo', {
        url : '/histo',
        templateUrl: 'views/history.html',
        controller: 'HistoryCtrl',
        controllerAs : 'history'
      })
      .state('stat', {
        url : '/histo/stat/:matchId',
        templateUrl: 'views/stat.html',
        controller: 'StatCtrl',
        controllerAs : 'stat'
      })
      .state('match', {
        url : '/match',
        templateUrl: 'views/match.html',
        controller: 'MatchCtrl',
        controllerAs : 'matchCtrl'
      });
  });
