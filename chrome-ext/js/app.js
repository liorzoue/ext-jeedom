var JeedomControllers = angular.module('MeteoControllers', ['ngResource', 'ngRoute', 'LocalStorageModule']);
var JeedomApp = angular.module('JeedomApp', ['MeteoControllers', 'angular-jsonrpc-client']);

JeedomApp
	.config(function (localStorageServiceProvider, jsonrpcConfigProvider) {
	  	localStorageServiceProvider
	  		.setPrefix('JeedomApp')
	  		.setNotify(true, true);

        jsonrpcConfigProvider.set({
            url: 'http://my.jeedom.url:8080/core/api/jeeApi.php'
        });
    });