app.controller('LocationDetailCtrl', function($rootScope,$scope,$stateParams,$cordovaGeolocation,$filter,LocaleService,PageRedirectService) {
    var findLocationTypes = {
        TYPE_FIND_BY_LOCATION: 0,
        TYPE_FIND_BY_ZIPCODE: 1,
        TYPE_FIND_BY_ADDRESS: 2
    }
    console.dir($stateParams);
    if(findLocationTypes.TYPE_FIND_BY_LOCATION == $stateParams.type){
        var posOptions = {timeout: 10000, enableHighAccuracy: true};
        $cordovaGeolocation.getCurrentPosition(posOptions)
            .then(function (position) {
                var lat  = position.coords.latitude;
                var long = position.coords.longitude;
                console.log("position: "+$filter('json')(position));
                console.log("position.coords: "+$filter('json')(position.coords));
            }, function(err) {

            });
    };
    if(findLocationTypes.TYPE_FIND_BY_ZIPCODE == $stateParams.type){

    };
    if(findLocationTypes.TYPE_FIND_BY_ADDRESS == $stateParams.type){

    };
});