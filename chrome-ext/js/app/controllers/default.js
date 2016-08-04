JeedomControllers.controller('defaultCtrl', ['$scope', '$location', '$filter', 'JeedomService', 'jeedomStorage', 'myDateTime', 'JeedomIcon', 'JeedomMessages', 'JeedomUpdates', 'Tracking', 
	function ($scope, $location, $filter, JeedomService, jeedomStorage, myDateTime, Icone, Messages, Updates, Tracking) {

	$scope.Options = jeedomStorage.load();
	$scope.Tracking = Tracking;

	var Jeedom = JeedomService($scope.Options.base, $scope.Options.apiKey);

	$scope.showEq = function (eqId) {
		$scope.DetailItem = null;
		Jeedom[$scope.searchItem[$scope.checkedItem].id].detailById(eqId).then(function (result) { 
			$scope.eq.name = '';
			$scope.graphDetail = null;
			$scope.DetailItem = result; 
			console.log(result);
		});

		Tracking.event('search', 'click_result');
	};

	$scope.getCommandGraph = function(item, cmd) {
		if (!cmd.isHistorized) return false;

		var getValues = function (vals) {
			var arr = [];

			for (var i = vals.length - 1; i >= 0; i--) {
				arr.push(parseFloat(vals[i].value));
			}
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

	$scope.toggleDisplayMessages = function () {
		$scope.displayMessage = !$scope.displayMessage;
		Tracking.event('messages', $scope.displayMessage ? 'show' : 'hide');
	}

	$scope.toggleDisplayUpdates = function () {
		$scope.displayUpdates = !$scope.displayUpdates;
		Tracking.event('updates', $scope.displayUpdates ? 'show' : 'hide');
	}

	$scope.clearAllMessages = function () {
		Jeedom.Messages.removeAll();
		$scope.getMessages();

		Tracking.event('messages', 'remove_all');
	}

	$scope.getMessages = function () {
	 	Messages.getInstance().then(function (result) { $scope.Options.Messages = result; });
		Icone.Update();
	}

	$scope.doUpdates = function () {
		Jeedom.Updates.updateAll();
		Tracking.event('updates', 'click_do');
	}

	$scope.changeSearchItem = function (index) {
		$scope.checkedItem = index;
		$scope.SearchList = $scope.Options[$scope.searchItem[index].id];
		if ($scope.isSearchActive) Tracking.event('search_item', 'changeTo_'+$scope.searchItem[index].id);
	}

	$scope.search = function () {
		$scope.isSearchActive = !$scope.isSearchActive;
		Tracking.event('search', $scope.isSearchActive ? 'show' : 'hide');
	}

	Tracking.pageView('/default');

	$scope.displayMessage = false;
	$scope.displayUpdates = false;
	$scope.isSearchActive = false;
	$scope.parseFloat = parseFloat;
	$scope.eq = {};

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

	Jeedom.Version().then(function (result) { $scope.Options.Version = result; });
	Updates.getInstance().then(function (result) { $scope.Options.Updates = result; });

	Jeedom.Equipements.getAll().then(function (result) { 
		$scope.Options.Equipements = result;
		$scope.changeSearchItem($scope.checkedItem);
	});

	Jeedom.Scenarios.getAll().then(function (result) { 
		$scope.Options.Scenarios = result; 
		$scope.changeSearchItem($scope.checkedItem);
	});

	$scope.getMessages();
	
}]);