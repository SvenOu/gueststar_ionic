app.factory('ProfileService', function (MessageLogManager,RestService,ProfileDao) {
    var ProfileService = {
        registerFromServer: function () {
            //var userProfile = me.refeshUserProfile();
            //if(null == userProfile){
            //    MessageLogManager.log("ProfileService.registerFromServer: userProfile is null");
            //    return false;
            //}
            //me.initUserReward(userProfile.profileId);
            //
            //var url =  "/mobile/profile/register";
            //var resultProfile = RestService.put(url, userProfile);
            //
            //if (null == resultProfile)
            //    return false;
            //
            //this.updateUserProfile(resultProfile, false);
            //return true;
        },
        updateUserProfile: function (userProfile) {
            MessageLogManager.log("ProfileService.updateUserProfile", {userProfile: userProfile});
            return null;
        },
        registerDeviceToken: function () {
            MessageLogManager.log("ProfileService.registerDeviceToken");
            return null;
        },
        saveDeviceToken: function (deviceToken) {
            MessageLogManager.log("ProfileService.saveDeviceToken", {deviceToken: deviceToken});
            return null;
        },
        saveDeviceUdtsWithUdts: function (udts) {
            MessageLogManager.log("ProfileService.saveDeviceUdtsWithUdts", {udts: udts});
            return null;
        },
        updateUserProfileLanguage: function (languageCode) {
            MessageLogManager.log("ProfileService.updateUserProfileLanguage", {languageCode: languageCode});
            return null;
        },
        updateUserProfileZipCode: function (zipCode) {
            MessageLogManager.log("ProfileService.updateUserProfileZipCode", {zipCode: zipCode});
            return null;
        },
        updateUserProfileBySyncData: function (userProfile) {
            MessageLogManager.log("ProfileService.updateUserProfileBySyncData", {userProfile: userProfile});
            return null;
        },
        refeshUserProfile: function () {
            var userProfile = getUserProfile();
            var profileId = userProfile.profileId;

            // get List<UserProfileExt>
            var userProfileExts = getUserProfileExts(profileId);
            userProfile.userProfileExts = userProfileExts;

            // get UserDevice
            var userDevice = getUserDevice(userProfile);
            userProfile.userDevice = userDevice;

            MessageLogManager.log("ProfileService.refeshUserProfile"+ userProfile);

            app.commonInfo.profileModel.userProfile = userProfile;

            return userProfile;
        },
        //private method
        initUserReward: function (profileId) {

        },
        getUserProfile: function(){
            //UserProfile userProfile = ProfileDao.findUserProfile();
            //if(userProfile == null){
            //    String profileId = IdUtils.generateProfileId(commonModel.appContext);
            //    userProfile = new UserProfile();
            //    userProfile.setProfileId(profileId);
            //    userProfile.setAppId(CommonModel.getAppId());
            //    userProfile.setAppVersion(commonModel.getAppVersion());
            //    userProfile.setDeviceType(commonModel.deviceType);
            //    userProfile.setDeviceSystem(CommonModel.DEVICE_SYSTEM);
            //    userProfile.setActive(true);
            //    userProfile.setCreateDate(new Date());
            //    userProfile.setLanguageCode(LanguageCode.en);
            //    profileDao.insert(userProfile);
            //}
            //
            //return userProfile;
        },
        getProfileId: function(){

        },
        getUserProfileExts: function(profileId){

        },
        getUserDevice: function(userProfile){

        }

    };
    var me = ProfileService;
    return ProfileService;
});