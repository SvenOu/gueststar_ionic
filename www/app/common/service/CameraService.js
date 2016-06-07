app.factory('CameraService', function ($cordovaCamera, $filter) {
    var takePicture = function (type, successCallback, errorCallback) {
        var options = {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: type,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            if ('function' == typeof(successCallback)) {
                successCallback(imageData);
            }
        }, function (err) {
            if ('function' == typeof(errorCallback)) {
                errorCallback(err);
            } else {
                console.log("err: " + $filter('json')(err));
            }
        });
    };
    var cameraService = {
        takePictureFromCamera: function (successCallback, errorCallback) {
            takePicture(Camera.PictureSourceType.CAMERA,successCallback, errorCallback);
        },
        takePictureFromAlbum: function (successCallback, errorCallback) {
            takePicture(Camera.PictureSourceType.PHOTOLIBRARY,successCallback, errorCallback);
        }
    };
    return cameraService;
});