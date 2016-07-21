JeedomControllers.controller('backgroundCtrl', 
	['$scope', '$interval', 'Icone', 'Browser',
	function ($scope, $interval, Icone, Browser) {

	function action() {	};

	action();
	
	$interval(action, 5*60*1000);
}]);