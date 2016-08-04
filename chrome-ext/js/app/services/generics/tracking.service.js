JeedomApp.factory('Tracking', [function(){
    function _trackingMaker (event, category, variable) {
        var arry_track = [event, category];

        if(variable) arry_track.push(variable);
        
        _gaq.push(arry_track);

        console.log('tracking: ', arry_track);
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