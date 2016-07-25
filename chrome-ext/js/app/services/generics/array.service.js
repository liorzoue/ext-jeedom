JeedomApp.factory('arrayService', [function(){
	return {
		removeElement: function (arr, elt) {
			console.log('arrayService - arr', arr);
			console.log('arrayService - elt', elt);
			console.log('arrayService - indexOf:', arr.indexOf(elt));

			arr.splice(arr.indexOf(elt),1);

			return arr;
		}
	}
}]);