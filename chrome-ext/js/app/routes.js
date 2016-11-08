JeedomApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/first-launch', {
        templateUrl: '../partials/first-launch.html',
        controller: 'firstLaunchCtrl'
      }).
      
      // Default
      when('/default', {
        templateUrl: '../partials/default.html',
        controller: 'defaultCtrl'
      }).
      when('/default/search', {
        templateUrl: '../partials/search.html',
        controller: 'searchCtrl'
      }).
      when('/default/favoris', {
        templateUrl: '../partials/favoris.html',
        controller: 'favorisCtrl'
      }).

      // Détails
      when('/detail/equipement/:id', {
        templateUrl: '../partials/detail-equipement.html',
        controller: 'detailEquipementCtrl'
      }).
      when('/detail/scenario/:id', {
        templateUrl: '../partials/detail-scenario.html',
        controller: 'detailScenarioCtrl'
      }).

      // Autres
      when('/settings', {
        templateUrl: '../partials/settings.html',
        controller: 'settingsCtrl'
      }).
      otherwise({
        redirectTo: '/default'
      });
  }]);