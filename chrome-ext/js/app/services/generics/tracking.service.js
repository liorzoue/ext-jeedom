JeedomApp.factory('Tracking', ['Logging', function(Log){
    var factoryName = 'Tracking';

    function _trackingMaker (event, category, variable) {
        var arry_track = [event, category];

        if(variable) arry_track.push(variable);
        
        _gaq.push(arry_track);

        Log.write(Log.level.INFO, factoryName, arry_track);
    }

    return {
        pageView: function (pageName) {
            _trackingMaker('_trackPageview', pageName);
        },

        event: function (eventName, status) {
            _trackingMaker('_trackEvent', eventName, status)
        }
    }
}]);