JeedomControllers.controller('settingsCtrl', ['$scope', '$location', '$filter', 'jeedomStorage', 'Manifest', 'Tracking',
	function ($scope, $location, $filter, jeedomStorage, Manifest, Tracking) {	

	$scope.Tracking = Tracking;
	
	$scope.openUrl = function (newURL) {
		var utm = "utm_source=ext_jeedom&utm_medium=ext_settings&utm_campaign=link";
		chrome.tabs.create({ url: newURL + "?" + utm });
	};

	$scope.saveJeedom = function () {
		Tracking.event('save', 'jeedom');
		$scope.Options = jeedomStorage.save($scope.Options);

		$scope.toggleShowAddJeedom();

	};

	$scope.toggleShowAddJeedom = function () { 
		$scope.showAddJeedom = !$scope.showAddJeedom;
		Tracking.event('toggle_add', $scope.showAddJeedom ? 'show' : 'hide');
	 }

	Tracking.pageView('/settings');

	$scope.editJeedom = $scope.toggleShowAddJeedom;
	$scope.removeJeedom = jeedomStorage.remove;	

	$scope.addJeedom = false;
	$scope.showAddJeedom = false;

	$scope.Options = jeedomStorage.load();

	$scope.Manifest = Manifest.getInstance();

}]);