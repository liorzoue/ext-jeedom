JeedomControllers.controller('defaultCtrl', ['$scope', '$location', '$filter', 'JeedomService', 'jeedomStorage', 'myDateTime', 'JeedomIcon', 'JeedomMessages', 'JeedomUpdates', 
	function ($scope, $location, $filter, JeedomService, jeedomStorage, myDateTime, Icone, Messages, Updates) {

	$scope.Options = jeedomStorage.load();

	var Jeedom = JeedomService($scope.Options.base, $scope.Options.apiKey);

	$scope.showEq = function (eqId) {
		$scope.DetailItem = null;
		Jeedom[$scope.searchItem[$scope.checkedItem].id].detailById(eqId).then(function (result) { 
			$scope.eq.name = '';
			$scope.graphDetail = null;
			$scope.DetailItem = result; 
			console.log(result);
		});
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
	};

	$scope.getMessageText = function (msg) { return msg.replace("\\n","<br />"); }

	$scope.toggleDisplayMessages = function () {
		$scope.display_message = !$scope.display_message;
	}

	$scope.toggleDisplayUpdates = function () {
		$scope.displayUpdates = !$scope.displayUpdates;
	}

	$scope.clearAllMessages = function () {
		Jeedom.Messages.removeAll();
		$scope.getMessages();
	}

	$scope.getMessages = function () {
	 	Messages.getInstance().then(function (result) { $scope.Options.Messages = result; });
		Icone.Update();
	}

	$scope.changeSearchItem = function (index) {
		$scope.checkedItem = index;
		$scope.SearchList = $scope.Options[$scope.searchItem[index].id];
	}

	$scope.search = function () { $scope.isSearchActive = !$scope.isSearchActive; }

	_gaq.push(['_trackPageview', '/']);

	$scope.display_message = false;
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