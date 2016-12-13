JeedomApp.factory('Icone', ['Browser', function(Browser) {
    var _color = function (color) {
        switch (color) {
            case 'blue':
                Browser.setBadgeBackgroundColor({ color: '#0D47A1'});
                break;
            case 'red':
                Browser.setBadgeBackgroundColor({ color: '#A10D47'});
                break;
            default:
                Browser.setBadgeBackgroundColor({ color: color});

        }
    }
	return {
		set: function (text) {
			Browser.setBadgeText({text: text+'' });
			Browser.setBadgeBackgroundColor({ color: '#0D47A1'});
		},

        setColor: function (color) {
            _color(color);
        }
	}
}]);