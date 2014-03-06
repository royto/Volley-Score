/*global jQuery, ko, alert, console, window */
//Closure to isolate code
(function ($) {

    "use strict";
    
    //Gestion du storage
    var storage = window.localStorage,
        getTeamName = function (nb) {
            if (storage && storage.getItem('Team' + nb)) {
                return storage.getItem('Team' + nb);
            }
            return "Equipe " + nb;
        },
        saveTeamName = function (nb, value) {
            if (storage) {
                storage.setItem('Team' + nb, value);
            }
        },
        saveGame = function (game) {
            var savedGames;
            if (storage) {
                savedGames = JSON.parse(storage.getItem('games')) || [];
                savedGames.push(game);
                storage.setItem('games', JSON.stringify(savedGames));
            }
        },
        getSavedGames = function () {
            if (storage) {
                return JSON.parse(storage.getItem('games')) || [];
            }
        },
        removeSavedMatch = function (i) {
            if (storage) {
                var savedGames = getSavedGames();
                savedGames.splice(i(), 1);
                storage.setItem('games', JSON.stringify(savedGames));
            }
        },
        clearSavedMatch = function () {
            if (storage) {
                storage.removeItem('games');
            }
        };
    
    //Modeles Knockout
    function Team(name) {
        var self = this;
        self.name = ko.observable(name);
    }

    function Set() {
        var self = this;
        self.points = ko.observableArray([{ value: ko.observable(0) }, { value: ko.observable(0) }]);

        self.addPoint = function (teamNumber) {
            self.points()[teamNumber - 1].value(self.points()[teamNumber - 1].value() + 1);
        };

        self.isTechnicalTimeOut = function (teamNumber, setNumber) {
            //No Time out at 5st set
            if (setNumber !== 5) {
                //Check if team is first to 8 or 16 for TIME OUT
                if ((self.points()[teamNumber - 1].value() === 8 || self.points()[teamNumber - 1].value() === 16)
                        && self.points()[teamNumber - 1].value() > self.points()[(teamNumber % 2)].value()) {
                    alert('Temps Mort');
                }
            }
        };

        self.isSetOver = function (setNumber) {
            var setMinimumPoint = 25;
            if (setNumber === 5) {
                setMinimumPoint = 15;
            }

            //Check if one team has reach the set victory point with 2 points far ? 
            if ((self.points()[0].value() >= setMinimumPoint || self.points()[1].value() >= setMinimumPoint)
                    && Math.abs(self.points()[0].value() - self.points()[1].value()) >= 2) {
                return true;
            }
            return false;
        };

        self.reset = function () {
            this.points()[0].value(0);
            this.points()[1].value(0);
        };
    }

    var MatchModel = function () {
        var self = this;
        //init teams
        self.teams = ko.observableArray([new Team(getTeamName(1)), new Team(getTeamName(2))]);
        //init set
        self.sets = ko.observableArray([new Set(), new Set(), new Set(), new Set(), new Set()]);
        //init current set
        self.currentSet = ko.observable(0);
        //init set win
        self.setWin = ko.observableArray([{ value: ko.observable(0) }, { value: ko.observable(0) }]);

        //is Match in progress
        self.matchInProgress = ko.observable(false);

        self.isMatchOver = ko.observable(false);

        //init time out
        self.timeOut = ko.observableArray([{ value: ko.observable(0) }, { value: ko.observable(0) }]);
        
        self.savedGames = ko.observableArray(getSavedGames());
        
        self.removeGame = function (i) {
            removeSavedMatch(i);
            self.savedGames(getSavedGames());
        };
        
        self.clearGames = function () {
            clearSavedMatch();
            self.getSavedGames([]);
        };

        //Service
        self.startService = ko.observable(1);
        self.currentService = ko.observable(1);

        self.addPoint = function (teamNumber) {
            //Add point to the current set
            self.sets()[self.currentSet()].addPoint(teamNumber);

            //Winning point team gains service
            self.currentService(teamNumber);

            //Technical timeout
            self.sets()[self.currentSet()].isTechnicalTimeOut(teamNumber, self.currentSet() + 1);

            //Set Management
            if (self.sets()[self.currentSet()].isSetOver(self.currentSet() + 1)) {
                //Add Set to winning team
                self.setWin()[teamNumber - 1].value(self.setWin()[teamNumber - 1].value() + 1);
                //Match Management
                if (self.setWin()[teamNumber - 1].value() === 3) {
                    alert('Match gagné par ' + self.teams()[teamNumber - 1].name());
                    self.isMatchOver(true);
                } else {
                    alert('set gagné par ' + self.teams()[teamNumber - 1].name());
                    self.changeSet();
                    self.currentService(((parseInt(self.startService(), 10) + parseInt(self.currentSet(), 10) + 1) % 2) + 1);
                }
            }
        };

        self.changeSet = function () {
            self.currentSet(self.currentSet() + 1);

            //reinit Time out
            self.timeOut()[0].value(0);
            self.timeOut()[1].value(0);
        };

        self.askTimeOut = function (teamNumber) {
            self.timeOut()[teamNumber - 1].value(self.timeOut()[teamNumber - 1].value() + 1);
        };

        self.startGame = function () {
            self.matchInProgress(true);
            self.currentService(parseInt(self.startService(), 10));
            saveTeamName(1, self.teams()[0].name());
            saveTeamName(2, self.teams()[1].name());
        };

        self.reset = function () {

            self.sets()[0].reset();
            self.sets()[1].reset();
            self.sets()[2].reset();
            self.sets()[3].reset();
            self.sets()[4].reset();

            //reset current set
            self.currentSet(0);
            //reset set win
            self.setWin()[0].value(0);
            self.setWin()[1].value(0);

            //is Match in progress
            self.matchInProgress(false);
            self.isMatchOver(false);

            //reset time out
            self.timeOut()[0].value(0);
            self.timeOut()[1].value(0);

            //Service
            self.startService(1);
            self.currentService(1);

        };
        
        self.saveMatch = function () {
            var match = {
                teams : ko.toJS(self.teams),
                sets : ko.toJS(self.sets)
            };
            saveGame(match);
            self.savedGames(getSavedGames());
        };
    };

    $(function () {
        ko.applyBindings(new MatchModel());

        $('.tabs li a').on('click', function (e) {
            var me = $(this);
            //Set current to click link and remove it to others
            me.addClass('current').parent('li').siblings().find('a').removeClass('current');
            //get section to display and display it
            var section = me.data('section');
            $('section#' + section).show().siblings('section').hide();
        });

        //display home section at startup
        $('#homeMenu').trigger('click');
        
        //Méthode appelée apres mise à jour du cache
        function onUpdateReady() {
            $('#appUpdated').show();
        }
        
        //on s'abonne à l'événement de mise à jour du cache
        window.applicationCache.addEventListener('updateready', onUpdateReady);
        if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {
            onUpdateReady();
        }
        
        $('#reload').on('click', function() {
            document.location.reload();       
        });
    });
    
    window.volley = {
        saveGame : saveGame,
        getSavedGames : getSavedGames,
        removeSavedMatch : removeSavedMatch,
        matchModel : MatchModel
    };

}(jQuery));