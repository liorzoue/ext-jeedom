JeedomApp.factory('JeedomIcon', ['Icone', 'JeedomMessages', 'JeedomUpdates', 'Logging', function(Icone, Messages, Updates, Log){
    var _messages;

    return {
        Update: function () {
            _messages = Messages.getInstance();
            _updates = Updates.getInstance();

            _error = function (result) {
               Icone.set('x');
               Icone.setColor('red');
               Log.write(Log.level.ERROR, 'JeedomIcon', result);
            };
            
            _messages.then(function (result) {
                var count = result.length;
                if (result.length>0) { Icone.set(result.length); }
                else { Icone.set(''); }

                _updates.then(function (result) {
                    if ((result.length + count)>0) {
                        Icone.set(result.length + count);
                        if (count == 0) { Icone.setColor('red'); } 
                        else if (result.length == 0) { Icone.setColor('green'); }
                    }
                    else { Icone.set(''); }
                }).catch(_error);

            }).catch(_error);
        }
    }
}]);