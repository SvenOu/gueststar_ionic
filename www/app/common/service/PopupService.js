app.factory('PopupService', function ($ionicPopup,$interval, $translate) {
    var createPopupShowCallback =  function(showCallback,pop){
        var evetnCtr = $interval(function(){
            if(JQ('div.popup').css('display')){
                $interval.cancel(evetnCtr);
                if ('function' == typeof(showCallback)) {
                    showCallback(pop);
                }
            }
        }, 200);
    };
    var popupService = {
        confirm: function (message) {
            return $ionicPopup.confirm({
                cssClass: 'popup-no-hreader',
                template: message,
                okType: 'button-balanced',
                okText: $translate.instant('OK_UP'),
                cancelType: 'button-balanced',
                cancelText: $translate.instant('CANCEL')
            });
        },
        alert: function (message) {
            return $ionicPopup.alert({
                title: $translate.instant('MESSAGE'),
                template: message,
                okType: 'button-balanced',
                okText: $translate.instant('OK_UP')
            });
        },
        alertNoTitle: function (message) {
            return $ionicPopup.alert({
                cssClass: 'popup-no-hreader',
                template: message,
                okType: 'button-balanced',
                okText: $translate.instant('OK_UP')
            });
        },
        showAboutDialog: function (scope) {
            return $ionicPopup.alert({
                title: $translate.instant('CHURCHS_CHICKEN_APP'),
                templateUrl: './app/common/templates/about-dialog.html',
                okType: 'button-balanced',
                okText: $translate.instant('OK_UP'),
                scope: scope
            });
        },
        showZipDialog: function (scope) {
            return $ionicPopup.show({
                cssClass: 'popup-no-hreader',
                templateUrl: './app/common/templates/zip-dialog.html',
                scope: scope
            });
        },
        showContactToggleDialog: function (scope) {
            return $ionicPopup.show({
                cssClass: 'popup-no-hreader',
                templateUrl: './app/common/templates/contact-toggle-dialog.html',
                scope: scope
            });
        },
        showTakePictureDialog: function (scope,showCallback) {
            var pop =  $ionicPopup.show({
                cssClass: 'popup-no-hreader',
                templateUrl: './app/common/templates/take-picture-dialog.html',
                scope: scope
            });
            createPopupShowCallback(showCallback,pop);
            return pop;
        },
        showPictureCapturedDialog: function (scope,showCallback) {
            var pop = $ionicPopup.show({
                cssClass: 'popup-no-hreader',
                templateUrl: './app/common/templates/picture-captured-dialog.html',
                scope: scope
            });
            createPopupShowCallback(showCallback,pop);
            return pop;
        },
        showChooseMyChurchsDialog: function (scope,showCallback) {
            var pop = $ionicPopup.show({
                cssClass: 'popup-no-hreader',
                templateUrl: './app/common/templates/choose-mychurchs-dialog.html',
                scope: scope
            });
            createPopupShowCallback(showCallback,pop);
            return pop;
        },
        showFeedbackSurveyDialog: function (scope) {
            return $ionicPopup.show({
                cssClass: 'popup-no-hreader',
                templateUrl: './app/common/templates/feedback-survey-dialog.html',
                scope: scope
            });
        }
    };
    return popupService;
});