JeedomControllers.controller('listExpandableCtrl', ['$scope', 'Tracking', 'Logging', function($scope, Tracking, Log){
    var controllerName = 'listExpandableCtrl';

    $scope.extend = false;
    $scope.nbSmall = 2;
    $scope.toggle = function () {
        $scope.extend = !$scope.extend;
        Tracking.event('list-expand ['+ $scope.$ctrl.title +']', $scope.extend ? 'show' : 'hide');
    }
}])