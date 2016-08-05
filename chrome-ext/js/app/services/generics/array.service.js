JeedomApp.factory('arrayService', [function(){
	return {
		removeElement: function (arr, elt) {
			arr.splice(arr.indexOf(elt),1);
			return arr;
		},

        isInArray: function (arr, elt) {
            return arr.indexOf(elt) > 0;
        }
	}
}]);