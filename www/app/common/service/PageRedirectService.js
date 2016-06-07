app.factory('PageRedirectService', function ($ionicHistory, $state) {
    var pageRedirectService = {
        gotoPage: function (pageId,toParams) {
            if ('main' == pageId) {
                $ionicHistory.nextViewOptions({
                    disableBack: true,
                    historyRoot: true
                });
            }
            if ('newRegisterMode' == pageId) {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
            }
            $state.go(pageId,toParams);
        },
        goBack: function () {
            $ionicHistory.goBack();
        }
    };
    return pageRedirectService;
});