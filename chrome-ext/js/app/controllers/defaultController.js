JeedomControllers.controller('defaultCtrl', ['$scope', '$location', '$filter', 'JeedomService', 'jeedomStorage', 'myDateTime', 'Icone',
	function ($scope, $location, $filter, JeedomService, jeedomStorage, myDateTime, Icone) {

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

	$scope.getMessageText = function (msg) {
		return msg.replace("\\n","<br />");
	}

	$scope.toggleDisplayMessages = function () {
		$scope.display_message = !$scope.display_message;
	}

	$scope.clearAllMessages = function () {
		Jeedom.Messages.removeAll();
		$scope.getMessages();
	}

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

	$scope.changeSearchItem = function (index) {
		$scope.checkedItem = index;
		$scope.SearchList = $scope.Options[$scope.searchItem[index].id];
	}

	_gaq.push(['_trackPageview', '/']);

	$scope.Options = jeedomStorage.load();
	$scope.display_message = false;
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

	var Jeedom = JeedomService($scope.Options.base, $scope.Options.apiKey);

	Jeedom.Version().then(function (result) { $scope.Options.Version = result; });
	Jeedom.Updates.getAll().then(function (result) { $scope.Options.Updates = $filter('filter')(result, {status: 'Update'}); });
	Jeedom.Equipements.getAll().then(function (result) { 
		$scope.Options.Equipements = result;
		$scope.SearchList = $scope.Options[$scope.searchItem[$scope.checkedItem].id];
	});

	Jeedom.Scenarios.getAll().then(function (result) { 
		$scope.Options.Scenarios = result; 
		$scope.SearchList = $scope.Options[$scope.searchItem[$scope.checkedItem].id];
	});

	$scope.getMessages();
	
}]);