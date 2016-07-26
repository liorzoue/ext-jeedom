JeedomApp.factory('Tracking', [function(){
    function _trackingMaker (event, category) {
        var arry_track = [event, category];
        _gaq.push(arry_track);

        console.log('tracking: ', arry_track);
    }

    return {
        pageView: function (pageName) {
            _trackingMaker('_trackPageview', pageName);
        }
    }
}]);