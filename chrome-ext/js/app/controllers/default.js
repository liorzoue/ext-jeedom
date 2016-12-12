JeedomControllers.controller('defaultCtrl', ['$scope', '$location', '$filter', 'JeedomService', 'jeedomStorage', 'myDateTime', 'JeedomIcon', 'JeedomMessages', 'JeedomUpdates', 'JeedomFavorites', 'Tracking', 'Logging',
	function ($scope, $location, $filter, JeedomService, jeedomStorage, myDateTime, Icone, Messages, Updates, Favs, Tracking, Log) {

	$scope.Options = jeedomStorage.load();
	$scope.Tracking = Tracking;

	var Jeedom = JeedomService($scope.Options.base, $scope.Options.apiKey);

	$scope.getCommandGraph = function(item, cmd) {
		if (!cmd.isHistorized) return false;

		var getValues = function (vals) {
			var arr = [];
			for (var i = vals.length - 1; i >= 0; i--) { arr.push(parseFloat(vals[i].value)); }
			return arr;
		};

		var dateStart = new Date();
		dateStart = $filter('date')(dateStart.setDate(dateStart.getDate()-1), "yyyy-MM-dd");

		Jeedom.history(cmd.id, dateStart, "now").then(function (result) {
			$scope.graphDetail = {
				name: item.name + ' - ' + cmd.name,
				result: result,
				item: item,
				stats: new stats({ data: getValues(result)})
			};

			$scope.graphDetail.stats.executeAll();
		});

		Tracking.event('equipement', 'click_graph');
	};

	$scope.getMessageText = function (msg) { return msg.replace("\\n","<br />"); }

	$scope.clearAllMessages = function () {
		Jeedom.Messages.removeAll();
		$scope.getMessages();

		Tracking.event('messages', 'remove_all');
	}

	$scope.getMessages = function () {
	 	Messages.getInstance().then(function (result) { 
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

	$scope.showFavs = function () {
		$scope.displayFavs = !$scope.displayFavs;
		if ($scope.displayFavs) $scope.Favs = Favs.Get();
		Tracking.event('favs', $scope.displayFavs ? 'show' : 'hide');
	}

	$scope.isFavorite = function (what, id) {
		var ls = $filter('filter')(Favs.Get(), {type: what, id: id});
		return ls.length == 1;	
	}

	$scope.toggleFavorite = function (what, id) {
		var is = $scope.isFavorite(what, id);

		if(is) Favs.Remove(what, id);
		else Favs.Add(what, id);

		Tracking.event('favs', is ? 'remove' : 'add');
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