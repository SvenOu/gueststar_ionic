//首先重新定义jquery别名
JQ = $.noConflict(true);

var dynamicScriptLoader ={
    //appScripts: [
    //    "app/common/locale/en_US.js",
    //    "app/common/locale/es_rES.js",
    //
    //    "app/common/app.js",
    //    "app/common/appConfig.js",
    //    "app/common/utils/churchs-utils.js",
    //    "app/common/controller.js",
    //    "app/common/service.js",
    //    "app/common/dataBase/sqlManager.js",
    //
    //    "app/main/controller.js",
    //    "app/rewards/controller.js",
    //    "app/menu/controller.js",
    //    "app/profile/controller.js",
    //    "app/location/controller.js",
    //    "app/savings/controller.js",
    //    "app/experience/controller.js"
    //],
    //loadScripts: function(){
    //    var index = 0,appScripts =dynamicScriptLoader.appScripts, length = dynamicScriptLoader.appScripts.length;
    //    var callback = function(data, textStatus, jqxhr){
    //        if(index < length){
    //            JQ.getScript(appScripts[index], callback);
    //            index++;
    //        }
    //    };
    //    callback();
    //}
};