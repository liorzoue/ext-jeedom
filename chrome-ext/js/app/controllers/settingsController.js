JeedomControllers.controller('settingsCtrl', ['$scope', '$location', '$filter', 'jeedomStorage', 'Manifest', function ($scope, $location, $filter, jeedomStorage, Manifest) {	
	_gaq.push(['_trackPageview', '/settings']);
	$scope.addJeedom = false;

	$scope.Options = jeedomStorage.load();
	
	$scope.Manifest = Manifest.get();
	$scope.showAddJeedom = false;

	$scope.openUrl = function (newURL) {
		chrome.tabs.create({ url: newURL });
	};

	$scope.saveJeedom = function () {
		console.log('saveJeedom', $scope.Options);
		$scope.Options = jeedomStorage.save($scope.Options);

		$scope.toggleShowAddJeedom();

	};

	$scope.editJeedom = function () {
		$scope.toggleShowAddJeedom();
	}

	$scope.removeJeedom = function () {
		$scope.Options = jeedomStorage.remove();
	}

	$scope.toggleShowAddJeedom = function () {
		$scope.showAddJeedom = !$scope.showAddJeedom;
	}
}]);