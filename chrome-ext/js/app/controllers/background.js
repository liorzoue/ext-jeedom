JeedomControllers.controller('backgroundCtrl', ['$scope', '$interval', 'JeedomIcon',
    function ($scope, $interval, Icone) {

    function action() {	
        Icone.Update();
    };

    action();

    $interval(action, 5*60*1000);
}]);