class TeamStats {
    constructor() {
        this.templateUrl = 'views/directives/team-stats.html';
        this.restrict = 'E';
        this.scope = {
			stats: '='
		};
    }
}

angular.module('volleyApp').directive('teamStats', () => new TeamStats());
