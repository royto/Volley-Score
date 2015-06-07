class teamStats {
    constructor() {
        this.templateUrl = 'views/directives/team-stats.html';
        this.restrict = 'E';
        this.scope = {
			stats : '='
		};
    }

    // optional link function
    link(scope, element) {

    }
}

angular.module('volleyApp').directive('teamStats', () => new teamStats());
