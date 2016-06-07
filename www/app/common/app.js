app = angular.module('churchs', ['ngCordova', 'ngCookies', 'pascalprecht.translate', 'ionic', 'ngResource', 'ionic.rating']);
app.LOCALE = {
    EN: 'en',
    ES: 'es'
};
app.commonInfo = {
    appModel:{},
    evalModel: {},
    commonModel: {},
    experienceModel: {},
    syncModel: {},
    couponModel: {},
    locationModel: {},
    profileModel: {},
    complaintModel: {}
};
app.developOptions = {
    DEV_BASE_URL: "http://10.0.0.85:8080/ChurchsGS",
    TEST_BASE_URL: "http://testchurchsgs.technologystudios.com",
    TRAINER_BASE_URL: "http://testchurchsgs.technologystudios.com",
    SERVER_BASE_URL: "http://churchsgs.technologystudios.com",

    DEV_MODE: "DEV",
    TEST_MODE: "TEST",
    PROD_MODE: "PROD",
    TRAINER_MOED: "TRAINER",

    DATE_TIME_PARTTERN: "yyyy-MM-dd'T'HH:mm:ssZ",

    printServiceLog: true,
    isDevelopMode: true,
    isBroserMode: true,//是否是本地浏览器测试
    dataFileName: 'dataFile',

    getBaseUrl: function(){
        var me = app.developOptions;

        me.CURRENT_MODE = me.DEV_MODE;//修改此处

        if (me.CURRENT_MODE == me.PROD_MODE)
            return me.SERVER_BASE_URL;
        else if (me.CURRENT_MODE == me.TEST_MODE)
            return me.TEST_BASE_URL;
        else if (me.CURRENT_MODE  == me.DEV_MODE)
            return me.DEV_BASE_URL;
        else if (me.CURRENT_MODE  == me.TRAINER_MOED)
            return me.TRAINER_BASE_URL;
        else
            return me.DEV_BASE_URL;
    }
};
app.run(function ($ionicPlatform, $filter, $cordovaSplashscreen, $resource, $http, $cordovaMedia, $cordovaSQLite, $cordovaOauth, $cordovaFile,$cordovaAppVersion, churchsUtils, sqlManager,ProfileService,RewardService) {

    var appLunchAction = function () {

        if (app.developOptions.isBroserMode) {
            if (navigator.splashscreen)
                $cordovaSplashscreen.hide();
            return;
        }

        $cordovaAppVersion.getAppVersion().then(function (version) {
            app.commonInfo.appVersion = version;
            app.commonInfo.device = device;
        });

        sqlManager.updateDatabaseToLatestVersion(function(){
            //SyncDataDao.test();
        });
        ProfileService.registerFromServer();
        RewardService.getUserRewardFromServer();

        $cordovaFile.checkFile(cordova.file.applicationStorageDirectory, app.developOptions.dataFileName)
            .then(function (success) {

                $cordovaSplashscreen.hide();

            }, function (error) {

                var src = cordova.file.applicationDirectory + "www/media/welcome.wav";
                var my_media = $cordovaMedia.newMedia(src);
                my_media.then(function () {
                    //hide Splashscreen
                    $cordovaSplashscreen.hide();
                    my_media.release();

                    $cordovaFile.createFile(cordova.file.applicationStorageDirectory, app.developOptions.dataFileName);

                }, function (error) {
                    console.log("error: " + $filter('json')(error));
                });

                my_media.play();
            }
        );

    };

    $ionicPlatform.ready(function () {

        appLunchAction();

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        //var db = $cordovaSQLite.openDB({ name: "gueststar.sqlit" });
        //console.dir(Object.getOwnPropertyNames(db));
        //console.dir(Object.keys(db));
        //console.log("db: "+$filter('json')(db));

        //console.log("status: "+$filter('json')(status));
        // Define CreditCard class
        // var CreditCard = $resource(app.developOptions.getBaseUrl()+ '/mobile/reward/get/:profileId',
        //     null, {
        //         getUserInfo: {method:'GET'}
        //     });
        // // We can retrieve a collection from the server
        //var result = CreditCard.getUserInfo({profileId:'6a108435a3c2b0e2f2defc0577493b9d'},function(res){
        //    console.log("res: "+$filter('json')(res));
        //},function(error){
        //    console.log("error: "+$filter('json')(error));
        //});
        //RestService.get("/mobile/reward/get/:profileId",{profileId:'6a108435a3c2b0e2f2defc0577493b9d'},function(res){
        //        console.log("res: "+$filter('json')(res));
        //    },function(error){
        //        console.log("error: "+$filter('json')(error));
        //    });
        //

        //$http.get(app.developOptions.baseUrl/l+ 'www/sqllite-raw/dbchg_1.xml').then(function(response) {
        //    console.log(response);
        //    console.log(churchsUtils.xml_str2json(response.data));
        //});
        //sqlManager.updateDatabaseToLatestVersion();
        //console.log("cordova.file: "+$filter('json')(cordova.file));


    });

});

