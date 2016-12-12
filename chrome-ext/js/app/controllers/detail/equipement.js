JeedomControllers.controller('detailEquipementCtrl', ['$scope', '$routeParams', 'Tracking', 'JeedomService', 'jeedomStorage', function($scope, $routeParams, Tracking, JeedomService, jeedomStorage){
    $scope.Tracking = Tracking;
    Tracking.pageView('/search/equipement-detail');
    $scope.Options = jeedomStorage.load();
    var Jeedom = JeedomService($scope.Options.base, $scope.Options.apiKey);

    console.log('routeParams ', $routeParams );

    Jeedom.Equipements.detailById($routeParams.id).then(function (result) { 
        $scope.DetailItem = result;
        console.log('result', result);
    });
}]);