JeedomControllers.controller('backgroundCtrl', ['$scope', '$interval', 'Icone', 'Browser', 'JeedomService', 'jeedomStorage',
    function ($scope, $interval, Icone, Browser, JeedomService, jeedomStorage) {

    $scope.Options = jeedomStorage.load();
    var Jeedom = JeedomService($scope.Options.base, $scope.Options.apiKey);

    $scope.getMessages = function () {
        Jeedom.Messages.getAll().then(function (result) {
            $scope.Options.Messages = result;

            if (result.length>0) {
                Icone.set(result.length);
            } else {
                Icone.set('');
            }
        });
    }

    function action() {	
        $scope.getMessages();
    };

    action();

    $interval(action, 5*60*1000);
}]);