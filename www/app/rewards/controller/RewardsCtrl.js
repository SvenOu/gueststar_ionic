app.controller('RewardsCtrl', function($rootScope,$scope,LocaleService,PageRedirectService,PopupService) {
    var me = this;
    $scope.gotoNewExperience = function () {
        PageRedirectService.gotoPage('experience.newExperience');
    };
    $scope.showRewardSurveyDialog = function(){
        me.rewardSurveyDialog = PopupService.showFeedbackSurveyDialog($scope);
    }

    $scope.beginRewardSurveyBtnClick = function(){
        me.rewardSurveyDialog.close();
        $scope.gotoNewExperience();
    }
    $scope.cancelBtnClick = function(){
        me.rewardSurveyDialog.close();
    }
})