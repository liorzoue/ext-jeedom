JeedomApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/default', {
        templateUrl: 'partials/default.html',
        controller: 'defaultCtrl'
      }).
      when('/settings', {
        templateUrl: 'partials/settings.html',
        controller: 'settingsCtrl'
      }).
      otherwise({
        redirectTo: '/default'
      });
  }]);