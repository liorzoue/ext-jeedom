var JeedomControllers = angular.module('JeedomControllers', ['ngResource', 'ngRoute', 'LocalStorageModule']);
var JeedomApp = angular.module('JeedomApp', ['JeedomControllers', 'angular-jsonrpc-client']);

JeedomApp
	.config(function ($compileProvider, localStorageServiceProvider, jsonrpcConfigProvider) {
        
	  	localStorageServiceProvider
	  		.setPrefix('JeedomApp')
	  		.setNotify(true, true);

        //* Hack de loulou : init jsonrpc-client
        jsonrpcConfigProvider.set({ url: 'default_url' });
        // */
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
});

// Track basic JavaScript errors
window.addEventListener('error', function(e) {
    _gaq.push([
        '_trackEvent',
        'JavaScript Error',
        e.message,
        e.filename + ':  ' + e.lineno,
        true
    ]);
});