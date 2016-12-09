JeedomControllers.controller('searchCtrl', ['$scope', 'Tracking', 'JeedomService', 'jeedomStorage', function($scope, Tracking, JeedomService, jeedomStorage){
    $scope.Tracking = Tracking;
    Tracking.pageView('/search');
    $scope.Options = jeedomStorage.load();
    var Jeedom = JeedomService($scope.Options.base, $scope.Options.apiKey);

    $scope.eq = {};

    $scope.changeSearchItem = function (index) {
        $scope.checkedItem = index;
        $scope.SearchList = $scope.Options[$scope.searchItem[index].id];
        if ($scope.isSearchActive) Tracking.event('search_item', 'changeTo_'+$scope.searchItem[index].id);
    }

    Jeedom.Equipements.getAll().then(function (result) { 
        $scope.Options.Equipements = result;
        $scope.changeSearchItem($scope.checkedItem);
    });

    Jeedom.Scenarios.getAll().then(function (result) { 
        $scope.Options.Scenarios = result; 
        $scope.changeSearchItem($scope.checkedItem);
    });

    $scope.searchItem = [
        {
            name: "Equipements",
            id: "Equipements"
        },
        {
            name: "Scénarios",
            id: "Scenarios"
        }
    ];
    $scope.checkedItem = 0;
}])