JeedomApp.factory('Icone', ['Browser', function(Browser) {
	return {
		set: function (text) {
			Browser.setBadgeText({text: text+'' });
			Browser.setBadgeBackgroundColor({ color: '#0D47A1'});
		}
	}
}]);