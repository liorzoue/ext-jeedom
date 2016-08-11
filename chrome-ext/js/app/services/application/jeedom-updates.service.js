JeedomApp.factory('JeedomUpdates', ['$filter', 'Icone', 'JeedomService', 'jeedomStorage', 'Logging', function($filter,Icone, Service, Storage, Log){
    var _instance;
    var _expireAt;

    var _options = Storage.load();
    var _jeedom = Service(_options.base, _options.apiKey);

    var _result = null;

    function _addMinutes(date, minutes) { return new Date(date.getTime() + minutes*60000); }

    function _hasExpired() {
        if (_expireAt == null) return true;
        if (_expireAt < new Date()) return true;
        return false;
    }

    function _promiseMaker (functionToCall) {
        return new Promise(function (resolve, reject) {
            functionToCall()
                .then(function (result) { resolve($filter('filter')(result, {status: 'Update'})); })
                .catch(function (result) { reject(result); });
        })
    }

    function Updates() {
        Log.write(Log.level.INFO, 'JeedomUpdates', 'singleton: update');
        return _promiseMaker(_jeedom.Updates.getAll);
    }

    return {
        getInstance: function () {
            Log.write(Log.level.INFO, 'JeedomUpdates', 'singleton: get');
            if (_hasExpired()) {
                _instance = new Updates();

                // 1 minute
                _expireAt = _addMinutes(new Date(), 1);
            }
            return _instance;
        }
    }
}]);