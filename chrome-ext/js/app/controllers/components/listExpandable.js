JeedomControllers.controller('listExpandableCtrl', ['$scope', function($scope){
    //$scope.label = $ctrl.data.label;
    //$scope.icon = $ctrl.data.icon;
    $scope.extend = false;
    
    $scope.toggle = function () {
        $scope.extend = !$scope.extend;
    }
}])