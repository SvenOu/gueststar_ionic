app.config(function ($ionicConfigProvider, $translateProvider, $sceDelegateProvider, $urlRouterProvider) {
    $ionicConfigProvider.form.toggle('large');
    //set LOCALE
    $translateProvider.translations(app.LOCALE.EN, translations_en_US);
    $translateProvider.translations(app.LOCALE.ES, translations_es_rES);
    $translateProvider.preferredLanguage(app.LOCALE.EN);
    $translateProvider.useLocalStorage();

    //添加url白名单
    $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://www.churchs.com/**',app.developOptions.getBaseUrl()]);


    /* //如果url 转换成小写，则state里的url的匹配必须小写
     $urlRouterProvider.rule(function ($injector, $location) {
     var path = $location.path(), normalized = path.toLowerCase();
     if (path != normalized) {
     $location.replace().path(normalized);
     }
     console.dir(path);
     console.dir(normalized);
     });*/
});
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
        url: '/main',
        templateUrl: 'app/main/templates/main.html',
        controller: 'MainCtrl'
    }).state('newRegisterMode', {
        url: '/newRegisterMode',
        templateUrl: 'app/main/templates/new-register-mode.html',
        controller: 'NewRegisterModeCtrl'
    }).state('register', {
        url: '/register',
        templateUrl: 'app/main/templates/register.html',
        controller: 'RegisterCtrl'
    }).state('teamsAndConditions', {
        url: '/teamsAndConditions',
        templateUrl: 'app/main/templates/teams-and-conditions.html',
        controller: 'RegisterCtrl'
    }).state('rewards', {
        url: '/rewards',
        templateUrl: 'app/rewards/templates/rewards.html',
        controller: 'RewardsCtrl'
    }).state('menus', {
        url: '/menus',
        templateUrl: 'app/menu/templates/menu.html',
        controller: 'MenusCtrl'
    }).state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/templates/profile.html',
        controller: 'ProfileCtrl'
    });
    $stateProvider.state('location', {
        url: '/location',
        abstract: true,
        templateUrl: 'app/location/templates/location.html',
        controller: 'LocationCtrl'
    }).state('location.findLocation', {
        url: '/findLocation',
        templateUrl: 'app/location/templates/find-location.html'
    }).state('location.detailLocation', {
        url: '/detailLocation/:type',
        templateUrl: 'app/location/templates/location-detail.html',
        controller: 'LocationDetailCtrl'
    });
    $stateProvider.state('saving', {
        url: '/saving',
        abstract: true,
        templateUrl: 'app/savings/templates/saving.html',
        controller: 'SavingsCtrl'
    }).state('saving.coupons', {
        url: '/coupons',
        templateUrl: 'app/savings/templates/coupons.html'
    }).state('saving.couponsUse', {
        url: '/couponsUse',
        templateUrl: 'app/savings/templates/coupons-use.html'
    });
    $stateProvider.state('experience', {
        url: '/experience',
        abstract: true,
        templateUrl: 'app/experience/templates/experience.html',
        controller: 'ExperienceCtrl'
    }).state('experience.newExperience', {
        url: '/newExperience',
        templateUrl: 'app/experience/templates/new-experience.html'
    }).state('experience.experienceDetail', {
        url: '/experienceDetail',
        templateUrl: 'app/experience/templates/experience-detail.html'
    }).state('experience.myLocationDetail', {
        url: '/myLocationDetail',
        templateUrl: 'app/experience/templates/my-location-detail.html'
    });
    $urlRouterProvider.otherwise('/newRegisterMode');
});