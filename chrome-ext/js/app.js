var JeedomControllers = angular.module('JeedomControllers', ['ngResource', 'ngRoute', 'LocalStorageModule']);
var JeedomApp = angular.module('JeedomApp', ['JeedomControllers', 'angular-jsonrpc-client']);

JeedomApp
	.config(function (localStorageServiceProvider, jsonrpcConfigProvider) {
	  	localStorageServiceProvider
	  		.setPrefix('JeedomApp')
	  		.setNotify(true, true);

        //* Hack de loulou : init jsonrpc-client
        jsonrpcConfigProvider.set({ url: 'default_url' });
        // */
});