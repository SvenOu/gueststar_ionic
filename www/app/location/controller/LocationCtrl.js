app.controller('LocationCtrl', function($rootScope,$scope,$stateParams,LocaleService,PageRedirectService) {
    $scope.testLocationsData = [
        {
            num: 1
        },
        {
            num: 2
        },
        {
            num: 3
        },
        {
            num: 4
        }
    ];
    $scope.gotoDetailLocation= function(){
        PageRedirectService.gotoPage('location.detailLocation',{type:0});
    }

});