JeedomApp.factory('JeedomFavorites', ['arrayService', 'JeedomService', 'jeedomStorage', function(Arry, Service, Storage){
    var _options = Storage.load();
    var _jeedom = Service(_options.base, _options.apiKey);

    var exists = function (item) {
        // Init

        _options = Storage.load();
        if(!_options.favoris) _options.favoris = [];
        return !Arry.hasItem(_options.favoris, item);
    };

    return {
        Add: function(type, id) {
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
                _options.favoris = Arry.removeElement(_options.favoris, item);
                Storage.save(_options);
            }

            return _options;
        },

        Get: function () {
            // Reload
            _options = Storage.load();
            for (var i = _options.favoris.length - 1; i >= 0; i--) {
                var j = i;
                if (_options.favoris[i].id)
                    _jeedom.Equipements.getById(_options.favoris[i].id).then(function (result) {
                        _options.favoris[j].data = result;
                    });
            }

            return _options.favoris;
        }
    };
}]);