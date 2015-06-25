class SetEvolutionChart {
  constructor(statService) {
    this.template = `<div ac-chart="chartType" ac-data="data" ac-config="config"
class="chart" style="width: 90%; height:250px;"></div>`;
    this.restrict = 'E';
    this.scope = {
        set: '='
    };
    this.link = function(scope, element) {
      //Evolution of the score difference
      scope.scoreDifferenceEvolution = () => {
        let diff = statService.getDifference(scope.set);
        let tmpData = [];
        diff.forEach(function(element, index, array) {
          tmpData.push({x: index, y: [element] });
        });

        scope.data = {
          series: [''],
          data: tmpData
        };
      };

      scope.initEvolutionChart = () => {
        scope.diffCurrentSet = 1;

        scope.data = {
          series: [''],
          data: []
        };

        scope.chartType = 'line';
        scope.config = {
          labels: false,
          title: 'Evolution',
          legend: {
            display: true,
            position: 'right'
          },
          colors: ['#3276b1']
        };

        scope.scoreDifferenceEvolution();
      };
      scope.initEvolutionChart();

      scope.$watch('set', function () {
          scope.scoreDifferenceEvolution();
        }, true);
    };
  }
}

angular.module('volleyApp').directive('setEvolutionChart', ['StatService', (StatService) => new SetEvolutionChart(StatService)]);
