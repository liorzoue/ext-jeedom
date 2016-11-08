JeedomControllers.controller('listExpandableCtrl', ['$scope', 'Tracking', 'Logging', function($scope, Tracking, Log){
    var controllerName = 'listExpandableCtrl';
    //$scope.label = $ctrl.data.label;
    //$scope.icon = $ctrl.data.icon;
    $scope.extend = false;

    $scope.toggle = function () {
        $scope.extend = !$scope.extend;
        Tracking.event('list-expand ['+ $scope.$ctrl.title +']', $scope.extend ? 'show' : 'hide');
    }
}])