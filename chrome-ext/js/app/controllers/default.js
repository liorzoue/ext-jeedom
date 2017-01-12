JeedomControllers.controller('defaultCtrl', ['$scope', '$location', '$filter', 'arrayService', 'JeedomService', 'jeedomStorage', 'myDateTime', 'JeedomIcon', 'JeedomMessages', 'JeedomUpdates', 'JeedomFavorites', 'Tracking', 'Logging',
	function ($scope, $location, $filter, ArrayService, JeedomService, jeedomStorage, myDateTime, Icone, Messages, Updates, Favs, Tracking, Log) {

	$scope.Options = jeedomStorage.load();
	$scope.Tracking = Tracking;

	var Jeedom = JeedomService($scope.Options.base, $scope.Options.apiKey);

	$scope.getMessageText = function (msg) { return msg.replace("\\n","<br />"); }

	$scope.clearAllMessages = function () {
		Jeedom.Messages.removeAll();
        Messages.resetInstance();
		$scope.getMessages();

		Tracking.event('messages', 'remove_all');
	}

	$scope.getMessages = function () {
	 	Messages.getInstance().then(function (result) {
            var itemMessages = $filter('filter')($scope.MenuBadges, {id: 'messages'})[0];
            if (itemMessages) { 
                $scope.MenuBadges = ArrayService.removeElement($scope.MenuBadges, itemMessages);   
            }

	 		$scope.Options.Messages = result;
	 		$scope.MenuBadges.push({id: 'messages', count: $scope.Options.Messages.length, color: "blue", icon: 'message'});
	 		Log.write(Log.level.INFO, 'getMessages', $scope.Options.Messages);
	 	});
		Icone.Update();
	}

	$scope.getUpdates = function () {
		Updates.getInstance().then(function (result) { 
			$scope.Options.Updates = result;
	 		$scope.MenuBadges.push({id: 'updates', count: $scope.Options.Updates.length, color: "red", icon: 'update'});
	 		Log.write(Log.level.INFO, 'getUpdates', $scope.Options.Updates);
		});
		Icone.Update();
	}

	$scope.doUpdates = function () {
		Jeedom.Updates.updateAll();
		Tracking.event('updates', 'click_do');
	}

	$scope.init = function () {
        $scope.Error = {
            Message: '',
            hasError: false,
            isLoading: true
        };

		$scope.displayFavs = false;
		$scope.isSearchActive = false;
		$scope.parseFloat = parseFloat;


		$scope.Options.Messages = [];
		$scope.MenuBadges = [];
        $scope.Menu = [
            {type: 'link', text: 'Réglages', link:'#/settings', icon: 'settings'},
            {type: 'link', text: 'Rechercher', link:'#/default/search', icon: 'search'},
            {type: 'link', text: 'Favoris', link: '#/default/favoris', icon: 'star'}
        ];

		$scope.getMessages();
		$scope.getUpdates();

		Jeedom.Version()
            .then(function (result) { 
    			$scope.Options.Version = result;
    			$scope.Menu = $scope.Menu.concat([{type: 'text', text: 'v.'+$scope.Options.Version, icon: 'device_hub' }]);

    		})
            .catch(function (result) {
                Log.write(Log.level.INFO, 'Jeedom.Version', 'catch');
                $scope.Error.Message = 'Une erreur est survenue !';
                $scope.Error.hasError = true;
            })
            .finally(function (result) {
                Log.write(Log.level.INFO, 'Jeedom.Version', 'finally');
                $scope.Error.isLoading = false;
            });

		

		Jeedom.Equipements.getAll()
            .then(function (result) { 
    			$scope.Options.Equipements = result;
    		})
            .catch(function (result) {
                Log.write(Log.level.INFO, 'Jeedom.Equipements.getAll', 'catch');
                $scope.Error.Message = 'Une erreur est survenue !';
                $scope.Error.hasError = true;
            });

		Jeedom.Scenarios.getAll()
            .then(function (result) { 
    			$scope.Options.Scenarios = result; 
    		})
            .catch(function (result) {
                Log.write(Log.level.INFO, 'Jeedom.Scenarios.getAll', 'catch');
                $scope.Error.Message = 'Une erreur est survenue !';
                $scope.Error.hasError = true;
            });


	}

	if ($scope.Options.apiKey) {
        $scope.init();
    } else {
        Log.write(Log.level.INFO, 'GetOptions', 'No apiKey !');
        $location.path('/settings');
    }

	Tracking.pageView('/default');
}]);