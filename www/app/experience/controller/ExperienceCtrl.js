
app.controller('ExperienceCtrl', function($rootScope,$scope,$translate,$timeout,$filter,CameraService,LocaleService,PageRedirectService,PopupService) {
    var me =this;
    //先注明dialog接口，方便查找
    me.pictureCapturedDialog = null;
    me.takePictureDialog = null;
    me.confirmPicDialog = null;
    me.chooseMyLocationDialog = null;
    me.contactToggleDialog = null;

    me.imageData = null;

    var refreshData = function () {
        $translate(['EXPERIENCE_TYPES.DRIVE_THRU', 'EXPERIENCE_TYPES.DINE_IN', 'EXPERIENCE_TYPES.CARRY_OUT']).then(function (translations) {
            var chickenWays = [];
            angular.forEach(translations, function (val, key) {
                var element = {
                    id: key,
                    value: val,
                    isChecked: false
                }
                chickenWays.push(element);
            });
            $scope.EXPERIENCE_TYPES = chickenWays;
        });
    };
    refreshData();
    $rootScope.$on('$translateChangeSuccess', function () {
        refreshData();
    });

    $scope.rate = 3;
    $scope.max = 5;

    $scope.gotoExperienceDetail= function(){
        PageRedirectService.gotoPage('experience.experienceDetail')
    }
    $scope.gotoMyLocationDetail= function(){
        PageRedirectService.gotoPage('experience.myLocationDetail')
    }

    $scope.btnTakePictureClick = function(){
        if(null != me.imageData){
            me.pictureCapturedDialog = PopupService.showPictureCapturedDialog($scope,function(pop){
                JQ('#pictureCapturedImage').attr('src',me.imageData);
            });
        }else{
            me.takePictureDialog = PopupService.showTakePictureDialog($scope);
        }
    }

    $scope.dialogButtonsClick = function(buttonId){
        //in  me.takePictureDialog
        if('takePhoto' == buttonId){

            if(!app.developOptions.isBroserMode) {
                CameraService.takePictureFromCamera(function (imageData) {
                    me.pictureCapturedDialog = PopupService.showPictureCapturedDialog($scope,function(pop){
                        JQ('#pictureCapturedImage').attr('src',me.imageData);
                        me.takePictureDialog.close();
                    });
                    me.imageData = "data:image/jpeg;base64," + imageData;
                    JQ('#newExperienceBtnTakePicture').attr('src','img/icons/icon_from_album.png');
                    JQ('#newExperienceBtnTakePictureText').text($translate.instant('PICTURE_CAPTURED'));
                });
            }
        }
        else if('fromAlbum' == buttonId){
            if(!app.developOptions.isBroserMode) {
                CameraService.takePictureFromAlbum(function (imageData) {
                    me.pictureCapturedDialog = PopupService.showPictureCapturedDialog($scope,function(pop){
                        JQ('#pictureCapturedImage').attr('src',me.imageData);
                        me.takePictureDialog.close();
                    });
                    me.imageData = "data:image/jpeg;base64," + imageData;
                    JQ('#newExperienceBtnTakePicture').attr('src','img/icons/icon_from_album.png');
                    JQ('#newExperienceBtnTakePictureText').text($translate.instant('PICTURE_CAPTURED'));
                });
            }

        }
        else if('cancel' == buttonId){
            me.takePictureDialog.close();
        }

        //in  me.confirmPicDialog
        else if('reset' == buttonId){
            me.confirmPicDialog = PopupService.confirm($translate.instant('DELETE_PHOTO_CONFIRM'));
            me.confirmPicDialog.then(function(res) {
                if(res){
                    me.imageData = null;
                    me.takePictureDialog = PopupService.showTakePictureDialog($scope,function(){
                        me.pictureCapturedDialog.close();
                    });
                    JQ('#newExperienceBtnTakePicture').attr('src','img/icons/icon_camera.png');
                    JQ('#newExperienceBtnTakePictureText').text($translate.instant('TAKE_RECEIPT_PICTURE'));
                }else{
                    me.confirmPicDialog.close();
                }
            });
        }
        else if('picOk' == buttonId){
            me.pictureCapturedDialog.close();
        }


        //in  me.chooseMyLocationDialog
        else if('myCurrentLocation' == buttonId){
            me.chooseMyLocationDialog.close();
            $scope.gotoMyLocationDetail();
        }
        else if('ziporAddress' == buttonId){
            me.chooseMyLocationDialog.close();
            $scope.gotoMyLocationDetail();
        }
        else if('myLocationDialogIconClose' == buttonId){
            me.chooseMyLocationDialog.close();
        }

        //in  me.contactToggleDialog
        else if('contactToggleDialogSubmit' == buttonId){
            console.dir( $scope.contactToggleDialogInfo);
            me.contactToggleDialog.close();
        }

    }

    $scope.chooseMyChurchsBtnClick = function(){
        me.chooseMyLocationDialog = PopupService.showChooseMyChurchsDialog($scope);
    }


    $scope.testLocationsData = [
        {
            num: 1
        },
        {
            num: 2
        },
        {
            num: 3
        },
        {
            num: 4
        }
    ];

    $scope.experienceDetailSubmitBtnClick = function(){
        me.contactToggleDialog = PopupService.showContactToggleDialog($scope);
    }

    $scope.contactToggleDialogInfo = {
        hasContact: true,
        email:null,
        phone:null
    };
})