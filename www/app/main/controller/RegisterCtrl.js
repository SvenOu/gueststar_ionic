app.controller('RegisterCtrl', function ($scope,$translate,PopupService,PageRedirectService,churchsUtils) {

    $scope.gotoTeamsAndConditions = function () {
        PageRedirectService.gotoPage('teamsAndConditions');
    }

    $scope.userProfile = {};

    var validateRegisterForm = function (form) {
        var message;
        if (churchsUtils.isEmpty(form.firstName.$viewValue) ||
            churchsUtils.isEmpty(form.email.$viewValue) ||
            churchsUtils.isEmpty(form.dob.$viewValue) ||
            churchsUtils.isEmpty(form.zip.$viewValue)) {
            message = $translate.instant('NAME_EMAIL_REQUIRED');
            PopupService.alert(message);
            return false;
        }
        if (!form.firstName.$valid) {
            message = $translate('FIELD_REQUIRED', {fieldName: $translate.instant('NAME')});
            PopupService.alert(message);
            return false;
        }
        if (!form.email.$valid) {
            message = $translate('FIELD_REQUIRED', {fieldName: $translate.instant('EMAIL')});
            PopupService.alert(message);
            return false;
        }
        if (!form.dob.$valid) {
            message = $translate('FIELD_REQUIRED', {fieldName: $translate.instant('BIRTHDAY')});
            PopupService.alert(message);
            return false;
        }
        if (!form.zip.$valid) {
            message = $translate('FIELD_REQUIRED', {fieldName: $translate.instant('ZIP')});
            PopupService.alert(message);
            return false;
        }
        return true;
    }
    $scope.registerAction = function (form) {
        if(validateRegisterForm(form)){
            $scope.gotoTeamsAndConditions();
        }
    }
});