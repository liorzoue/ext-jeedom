JeedomApp.factory('JeedomIcon', ['Icone', 'JeedomMessages', 'JeedomService', 'jeedomStorage', function(Icone, Messages, Service, Storage){
    var Options = Storage.load();
    var Jeedom = Service(Options.base, Options.apiKey);

    var _messages;

    return {
        Update: function () {
            _messages = Messages.getInstance();
            _messages.then(function (result) {
                console.log('JeedomIcon', result);
                if (result.length>0) {
                    Icone.set(result.length);
                } else {
                    Icone.set('');
                }
            });
        }
    }
}]);