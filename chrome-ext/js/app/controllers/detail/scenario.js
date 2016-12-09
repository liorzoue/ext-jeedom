JeedomControllers.controller('detailScenarioCtrl', ['$scope', 'Tracking', 'JeedomService', 'jeedomStorage', function($scope, Tracking, JeedomService, jeedomStorage){
    $scope.Tracking = Tracking;
    Tracking.pageView('/search/scenario-detail');
    $scope.Options = jeedomStorage.load();
    var Jeedom = JeedomService($scope.Options.base, $scope.Options.apiKey);


}]);