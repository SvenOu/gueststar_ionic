app.controller('NewRegisterModeCtrl', function ($scope, PageRedirectService,RestService,$filter) {
    $scope.gotoRegister = function () {
        PageRedirectService.gotoPage('register');
    }
    $scope.registerWithFacebook = function(){
        RestService.get("/mobile/reward/get/:profileId",{profileId:'6a108435a3c2b0e2f2defc0577493b9d'},function(res){
            console.log("res: "+$filter('json')(res));
        },function(error){
            console.log("error: "+$filter('json')(error));
        });
    }
});