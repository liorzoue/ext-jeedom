JeedomApp.factory('jeedomStorage', ['myStorage', 'arrayService', function(myStorage, arrayService){

	var loadStorage = function (store) {
		var options = myStorage.load(store);
		if (options == null || options == {}) { options = { name: null, apiKey: null, base: null }; }
		return options;
	}

	var saveStorage = function (store, item) {
		 if(myStorage.save(store, item)) {
		 	return item;
		 } else {
		 	return null;
		 }
	}

	return {
		load: function () {
			return loadStorage("options");
		},

		save: function (options) {
			console.log('save', options);
			return saveStorage("options", options);
		},

		add: function (item) {

			options = item;
			return saveStorage("options", options);
		},

		remove: function () {
			return saveStorage("options", null);
		}

	};
}])
