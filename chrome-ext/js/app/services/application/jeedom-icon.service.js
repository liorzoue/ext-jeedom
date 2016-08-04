JeedomApp.factory('JeedomIcon', ['Icone', 'JeedomMessages', 'JeedomUpdates', function(Icone, Messages, Updates){
    var _messages;

    return {
        Update: function () {
            _messages = Messages.getInstance();
            _updates = Updates.getInstance();

            _messages.then(function (result) {
                var count = result.length;
                console.log('JeedomIcon', result);
                if (result.length>0) { Icone.set(result.length); }
                else { Icone.set(''); }

                _updates.then(function (result) {
                    if ((result.length + count)>0) { Icone.set(result.length + count); }
                    else { Icone.set(''); }
                })
            });
        }
    }
}]);