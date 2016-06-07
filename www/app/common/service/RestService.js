app.factory('RestService', function ($resource) {
    var extraParam = null,
        restUrlMap = {};//保存$resource实例
    var getRequestInstance = function(reativeUrl){

        if(!restUrlMap.reativeUrl){
            restUrlMap.reativeUrl = $resource(app.developOptions.getBaseUrl() + reativeUrl, extraParam, {

                put: {method: 'PUT'},
                putForArray: {method: 'PUT', isArray: true},

                get: {method: 'GET'},
                getForArray: {method: 'GET', isArray: true},

                post: {method: 'POST'},
                postForArray: {method: 'POST', isArray: true}

            });
        }
        return restUrlMap.reativeUrl;
    },restRequest = function(method,reativeUrl,param,successCallback,errorCallback,isArray){
        var requestInstance = getRequestInstance(reativeUrl);
        var methodFn = requestInstance[method];
        if(isArray){
            methodFn = requestInstance[(method + 'ForArray')];
        }
        return methodFn(param,successCallback,errorCallback);
    };

    var RestService = {
        get: function(reativeUrl,param,successCallback,errorCallback,isArray){
            return restRequest('get',reativeUrl,param,successCallback,errorCallback,isArray);
        },
        put: function(reativeUrl,param,successCallback,errorCallback,isArray){
            return restRequest('put',reativeUrl,param,successCallback,errorCallback,isArray);
        },
        post: function(reativeUrl,param,successCallback,errorCallback,isArray){
            return restRequest('post',reativeUrl,param,successCallback,errorCallback,isArray);
        }
    };
    return RestService;
});