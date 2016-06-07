app.factory('SyncDataService', function (MessageLogManager) {
    var SyncDataService = {

        addExperienceToSyncData: function (experienceBean) {
            MessageLogManager.log("SyncDataService.addExperienceToSyncData",{experienceBean: experienceBean});
            return null;
        },
        addCouponToSyncData: function (usedCoupons) {
            MessageLogManager.log("SyncDataService.addCouponToSyncData",{usedCoupons: usedCoupons});
            return null;
        },
        addComplaintToSyncData: function (complaint) {
            MessageLogManager.log("SyncDataService.addComplaintToSyncData",{coupon: complaint});
            return null;
        },
        addUserProfileToSyncData: function (userProfile) {
            MessageLogManager.log("SyncDataService.addUserProfileToSyncData",{userProfile: userProfile});
            return null;
        },
        addFirstRewardToSyncData: function (userReward) {
            MessageLogManager.log("SyncDataService.addFirstRewardToSyncData",{userReward: userReward});
            return null;
        },
        uploadDataToServer: function () {
            MessageLogManager.log("SyncDataService.uploadDataToServer");
            return null;
        },
        resetSyncDataStatus: function (status) {
            MessageLogManager.log("SyncDataService.resetSyncDataStatus",{status: status});
            return null;
        },
        addFeedbackToSyncData: function (complaint) {
            MessageLogManager.log("SyncDataService.resetSyncDataStatus",{complaint: complaint});
            return null;
        }
    };
    return SyncDataService;
});