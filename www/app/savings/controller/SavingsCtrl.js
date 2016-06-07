app.controller('SavingsCtrl', function($rootScope,$scope,LocaleService,PageRedirectService) {
    $scope.testCouponsData = [
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
    $scope.gotoCouponUse= function(){
        PageRedirectService.gotoPage('saving.couponsUse')
    }
});