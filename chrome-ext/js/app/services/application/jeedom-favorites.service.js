JeedomApp.factory('JeedomFavorites', ['arrayService', 'JeedomService', 'jeedomStorage', function(Arry, Service, Storage){
    var _options = Storage.load();
    var _jeedom = Service(_options.base, _options.apiKey);

    var exists = function (item) {
        if(!_options.favoris) _options.favoris = [];
        return !Arry.isInArray(_options.favoris, item);
    };

    return {
        Save: function(type, id) {
            var item = {type: type, id: id};
            if(exists(item)) {
                _options.favoris.push(item);
                Storage.save(_options);
            }

            return _options;
        },

        Remove: function (type, id) {
            var item = {type: type, id: id};
            if(exists(item)) {
                _options.favoris = Arry.removeElement(_options.favoris, item) 
            }

            return _options;
        }
    };
}]);