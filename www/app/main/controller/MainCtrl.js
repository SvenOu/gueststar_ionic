app.controller('MainCtrl', function ($rootScope, $scope,$ionicPopup,PopupService, PageRedirectService,sqlManager) {
    var me =this;
    $scope.gotoNewExperience = function () {
        PageRedirectService.gotoPage('experience.newExperience');
    };
    $scope.gotoRewards = function () {
        PageRedirectService.gotoPage('rewards');
    };
    $scope.gotoCoupons = function () {
        PageRedirectService.gotoPage('saving.coupons');
    };
    $scope.gotoFindLocation = function () {
        PageRedirectService.gotoPage('location.findLocation');
    };
    $scope.gotoProfile = function () {
        PageRedirectService.gotoPage('profile');
    };
    $scope.gotoMenus = function () {
        PageRedirectService.gotoPage('menus');
    };

    $scope.$on('main.afterEnter', function (event, data) {
        if(false){
            me.zipDialog = PopupService.showZipDialog($scope);
        }
    });
    $scope.zipDialogOkClick = function(){
        me.zipDialog.close();
    };


    $scope.showAboutDialog = function(){
        me.aboutDialog = PopupService.showAboutDialog($scope);
    };
    $scope.aboutDialogFeedbackBtnClick = function(){
        me.aboutDialog.close();
        $scope.gotoNewExperience();
    };
    $scope.aboutDialogLinkClick = function(){

    };

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
    $scope.hasCoupon = true;
    $scope.couponSlideHasChanged = function(index){
        //console.dir(index);
    };
    $scope.couponLeftIconController = function(index){
        if(0 == index){
            return false;
        }
        return true;
    };
    $scope.couponRightIconController = function(index){
        if(0 == $scope.testCouponsData.length || ($scope.testCouponsData.length - 1) == index){
            return false;
        }
        return true;
    };

    $scope.copyDatabaseToSdCard = function(){
        if(app.developOptions.isDevelopMode){
            sqlManager.copyDatabaseToSdCard();
        }
    }

});