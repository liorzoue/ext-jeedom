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

JeedomApp.component('cardRetour', {
    templateUrl: '../components/retour.html',
    bindings: { url: '=' }
});

JeedomApp.component('cardMenu', {
    templateUrl: '../components/menu.html',
    controller: 'menuCtrl',
    bindings: { 
        title: '=',
        icon:  '=',
        badge: '=',
        items: '=' 
    }
});

JeedomApp.component('listExpandable', {
    templateUrl: '../components/list-expandable.html',
    controller: 'listExpandableCtrl',
    bindings: { 
        title: '=',
        icon: '=',
        data: '='
    }
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