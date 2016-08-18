JeedomControllers.controller('searchCtrl', ['$scope', 'Tracking', function($scope, Tracking){
    $scope.Tracking = Tracking;
    Tracking.pageView('/search');
}])