app.controller('AppCtrl', function ($rootScope, $scope, $state, $interval, $ionicScrollDelegate, PageRedirectService, LocaleService) {

    $scope.toggleLocale = function () {
        LocaleService.toggleLocale();
        $ionicScrollDelegate.resize();
    }
    $scope.gotoMain = function () {
        PageRedirectService.gotoPage('main');
    }
    $scope.goBack = function () {
        PageRedirectService.goBack();
    }
    $scope.$on('$ionicView.afterEnter', function (event, data) {
        //事件广播
        var eventname = data.stateName + '.afterEnter';
        $scope.$broadcast(eventname, {
            event: event,
            data: data
        });

        var interVal = $interval(function(){
            var content = JQ('ion-pane[nav-view=active] ion-content.churchs-content');
            if(content && content.length > 0){
                $interval.cancel(interVal);
                fullfillHeight(content);
            }
        }, 50);
        var fullfillHeight = function (content) {
            var scrollContent = JQ('ion-pane[nav-view=active] ion-content.churchs-content div.scroll'),
                wraper = JQ('ion-pane[nav-view=active] .churchs-wrap-container');
            var OUT = 0;
            if ((content.outerHeight() - scrollContent.outerHeight()) > OUT && wraper.length > 0) {
                var wraperHeight = content.outerHeight() - scrollContent.outerHeight();
                wraper.outerHeight(wraperHeight-OUT);
            }
        }
    });
})