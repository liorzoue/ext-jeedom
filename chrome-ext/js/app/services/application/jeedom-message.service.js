JeedomApp.factory('JeedomMessages', ['Icone', 'JeedomService', 'jeedomStorage', function(Icone, Service, Storage){
    var _instance;
    var _expireAt;

    var _options = Storage.load();
    var _jeedom = Service(_options.base, _options.apiKey);

    var _lock = false;
    var _result = null;

    function _addMinutes(date, minutes) { return new Date(date.getTime() + minutes*60000); }

    function _hasExpired() {
        if (_expireAt == null) return true;
        if (_expireAt < new Date()) return true;
        return false;
    }

    function Message() {
        console.log('JeedomMessages', 'update singleton');

        return new Promise (function (resolve, reject) {
            _jeedom.Messages.getAll()
                .then(function (result) { resolve(result); })
                .catch(function (result) { reject(result); });
        });
    }

    return {
        getInstance: function () {            
            console.log('JeedomMessages', 'getInstance');
            if (_hasExpired()) {
                _instance = new Message();

                // 1 minute
                _expireAt = _addMinutes(new Date(), 1);
            }
            return _instance;
        }
    }
}]);