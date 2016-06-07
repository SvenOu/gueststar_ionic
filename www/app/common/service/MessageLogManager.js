app.factory('MessageLogManager', function ($filter) {
    var MessageLogManager = {
        log: function (from, message) {
            if(app.developOptions.printServiceLog){
                if("undefined" == typeof(message)) message = "";
                console.log(from+": "+$filter('json')(message));
            }
        }
    };
    return MessageLogManager;
});