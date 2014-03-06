'use strict';

angular.module('volleyApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/todo', {
                templateUrl: 'views/todo.html'
            })
            .when('/histo', {
                templateUrl: 'views/history.html',
                controller: 'HistoryCtrl'
            })
            .when('/match', {
                templateUrl: 'views/match.html',
                controller: 'MatchCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
