JeedomApp.factory('jeedomStorage', ['myStorage', 'arrayService', function(myStorage, arrayService){

	var loadStorage = function (store) {
		var options = myStorage.load(store);
		if (options == null || options == {}) { options = { name: null, apiKey: null, base: null }; }
		return options;
	}

	var saveStorage = function (store, item) {
	 	if(myStorage.save(store, item)) return item;
	 	return null;
	}

	return {
		load: 	function ()			{ return loadStorage("options"); 			},
		save: 	function (options) 	{ return saveStorage("options", options);	},
		remove: function () 		{ return saveStorage("options", null); 		},

		add: function (item) { 
			options = item;
			return saveStorage("options", options);
		}
	};
}])
