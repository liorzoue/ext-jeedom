JeedomApp.factory('JeedomService', ['$resource', 'jsonrpc', function($resource, jsonrpc){
	
	return function (baseUrl, apiKey) {
		var jeedomUrl = baseUrl;
		var jeedomApiKey = apiKey;

		function makeJsonRpcRequest (params) {
			var JsonResult;
			var JsonError;

			if (!params.params) params.params = {}; 
			params.params['apikey'] = jeedomApiKey;

			return jsonrpc.request(params.method, params.params);
		}

		return {			
			get: function () {
				return makeJsonRpcRequest({ method: 'version'});
			},

			Version: function () {
				return makeJsonRpcRequest({ method: 'version'});
			},
			
			history: function (id, startTime, endTime) {
				return makeJsonRpcRequest({ method: 'cmd::getHistory', params: {id: id, startTime: startTime, endTime: endTime}});
			},


			Updates: {
				getAll: function () {
					return makeJsonRpcRequest({ method: 'update::all'});
				}
			},

			Messages: {
				getAll: function () {
					return makeJsonRpcRequest({ method: 'message::all'});
				},

				removeAll: function () {
					return makeJsonRpcRequest({ method: 'message::removeAll'});
				}
			},

			Equipements: {
				getAll: function () {
					return makeJsonRpcRequest({ method: 'eqLogic::all'});
				},

				detailById: function (id) {
					return makeJsonRpcRequest({ method: 'eqLogic::fullById', params: {id: id}});
				}
			},

			Scenarios: {
				getAll: function () {
					return makeJsonRpcRequest({ method: 'scenario::all'});
				},

				detailById: function (id) {
					return makeJsonRpcRequest({ method: 'scenario::byId', params: {id: id}});
				}
			}

		};
	};

}]);