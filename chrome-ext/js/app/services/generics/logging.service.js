JeedomApp.factory('Logging', [function(){
    var _levels = {
        DEBUG:  0,
        INFO:   10,
        WARN:   20,
        ERROR:  30
    };

    function _log (level, what, message) {
        switch (level) {
            case _levels.DEBUG:
                console.log(level, '['+what+']', message);
                break;
            case _levels.INFO:
                console.log(level, '['+what+']', message);
                break;
            case _levels.WARN:
                console.warn(level, '['+what+']', message);
                break;
            case _levels.ERROR:
                console.error(level, '['+what+']', message);
                break;
        }
    }

    return {
        level: _levels,

        write: function (level, what, message) {
            _log(level, what, message);
        }
    }
}]);