app.factory('ExperienceService', function (MessageLogManager) {
    var ExperienceService = {

        createExperience: function (param, bitmap,userLocation) {
            MessageLogManager.log("ExperienceService.createExperience",{param: param,userLocation: userLocation});
            return null;
        },
        openExperience: function (performId) {
            MessageLogManager.log("ExperienceService.openExperience",{performId: performId});
            return null;
        },
        sumbitExperience: function (performId, userLocation) {
            MessageLogManager.log("ExperienceService.openExperience",{performId: performId, userLocation: userLocation});
            return null;
        },
        getPerformsByCriteria: function (criteria) {
            MessageLogManager.log("ExperienceService.getPerformsByCriteria",{criteria: criteria});
            return null;
        },
        getItemsByDataParent: function (parentId) {
            MessageLogManager.log("ExperienceService.getItemsByDataParent",{parentId: parentId});
            return null;
        },
        updateItemValue0AndValue1: function (bookId,value0,value1) {
            MessageLogManager.log("ExperienceService.updateItemValue0AndValue1",{bookId: bookId, value0: value0,value1: value1 });
            return null;
        },
        updateItemFields: function (bookId, values) {
            MessageLogManager.log("ExperienceService.updateItemFields",{bookId: bookId,values: values});
            return null;
        },
        resubmitExperiences: function () {
            MessageLogManager.log("ExperienceService.resubmitExperiences");
            return null;
        },
        isRewardSurveysAddible: function () {
            MessageLogManager.log("ExperienceService.isRewardSurveysAddible");
            return null;
        },
        updateContactInfo: function (evalPerform) {
            MessageLogManager.log("ExperienceService.updateContactInfo",{evalPerform: evalPerform});
            return null;
        },
        openEvalSurveyData: function (performId) {
            MessageLogManager.log("ExperienceService.openEvalSurveyData",{performId: performId});
            return null;
        },
        updateAccountNumber: function (performId, accountNumber) {
            MessageLogManager.log("ExperienceService.updateAccountNumber",{performId: performId,accountNumber: accountNumber});
            return null;
        },
        checkSurveyDataCompleted: function (performId) {
            MessageLogManager.log("ExperienceService.checkSurveyDataCompleted",{performId: performId});
            return null;
        }
    };
    return ExperienceService;
});