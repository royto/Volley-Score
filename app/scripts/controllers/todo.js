class TodoCtrl {
  constructor() {
   this.todos = [
      'Retrieve point button',
      'Reset',
      'Technical TimeOut'
    ];
  }
}

angular.module('volleyApp').controller('TodoCtrl', TodoCtrl);
