app.factory('RewardService', function (MessageLogManager) {
    var RewardService = {

        getMyRewardData: function () {
            MessageLogManager.log("RewardService.getMyRewardData");
            return null;
        },

        firstRewardIsRead: function () {
            MessageLogManager.log("RewardService.firstRewardIsRead");
            return null;
        },

        recalculateRewardByLastPerformId: function (lastPerformId) {
            MessageLogManager.log("RewardService.recalculateRewardByLastPerformId",{lastPerformId: lastPerformId});
            return null;
        },

        getUserRewardFromServer: function () {
            MessageLogManager.log("RewardService.getUserRewardFromServer");
            return null;
        }
    };
    return RewardService;
});