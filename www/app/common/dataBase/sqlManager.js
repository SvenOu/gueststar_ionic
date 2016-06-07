app.factory('sqlManager', function ($http,$filter,$cordovaFile,$cordovaSQLite,churchsUtils) {
    if(app.developOptions.isBroserMode)
        return null;

    var me = this;
    var dbConfig = {
        databaseName:'gueststar.sqlite',
        initialVersion: 1,
        latestVersion: 19
    };
    var sqlManager = {
        getDb: function(){
            var db = (!me.db) ? $cordovaSQLite.openDB({ name: dbConfig.databaseName }):me.db;
            return db;
        },
        execute: function(sql, params,from){
            return $cordovaSQLite.execute(sqlManager.getDb(), sql, params).then(
                function (res) {
                    console.log(from+" suceess: " + $filter('json')(res));
                    if(res.rows.item(0))
                        console.log("res.rows.item(0) suceess: " + $filter('json')(res.rows.item(0)));
                    return res;
                },
                function (err) {
                    console.error(from+" error: " + $filter('json')(err));
                    return err;
                });
        },
        updateDatabaseToLatestVersion: function(finishCallback){
            var db = sqlManager.getDb();
            //sqlManager.copyDatabaseToSdCard();
            sqlManager.getCurrentDbVersion(db,function(curVersion){
                var currentDbVersion = curVersion,
                    latestVersion = dbConfig.latestVersion;
                index = dbConfig.initialVersion;
                console.log('currentDbVersion: '+currentDbVersion+'\n latestVersion: '+latestVersion);
                if(currentDbVersion < latestVersion){
                    var callback = function(response){
                        var sqlSourceData = churchsUtils.xml_str2json(response.data);
                        var sqlData = sqlSourceData.sql;
                        if(currentDbVersion < sqlData['_version']){
                            console.log("update currentDbVersion:"+currentDbVersion+' to tagetversion: '+sqlData['_version']);
                            sqlManager.updateSqls(db,sqlData.statement);
                        }
                        index ++;
                        if(index <= latestVersion){
                            sqlManager.loadSqlliteFormServe(index,callback);
                        }else{
                            if('function' == typeof(finishCallback)) finishCallback();
                        }
                    };
                    sqlManager.loadSqlliteFormServe(index,callback);
                }else{
                    if('function' == typeof(finishCallback)) finishCallback();
                }
            });


        },
        updateSqls: function(db,statements){
            db.transaction(function(tx) {
                for(var i = 0; i < statements.length; i++){
                    var sqlStatement = statements[i];
                    tx.executeSql(sqlStatement['__cdata']);
                }
            });
        },
        loadSqlliteFormServe: function(index,callback){
            $http.get(cordova.file.applicationDirectory+ 'www/sqllite-raw/dbchg_'+index+'.xml').then(function(response) {
                if('function' == typeof(callback)){
                    callback(response);
                }
            });
        },
        getCurrentDbVersion: function(db,callback){
            var currentDbVersion = 0,
                checkSql ="SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='conf_general'",
                sql = "SELECT * FROM conf_general";

            if('function' != typeof(callback)){
                console.log('getCurrentDbVersion(db,callback) : callback must be function!');
                return;
            }
            db.transaction(function(tx) {
                tx.executeSql(checkSql, [], function(tx, res) {
                    var item = res.rows.item(0);
                    if(0 >= item.count){
                        callback(currentDbVersion);
                    }else{
                        db.transaction(function(tx) {
                            tx.executeSql(sql, [], function(tx, res) {
                                var item = res.rows.item(0);
                                currentDbVersion = item.param_value;
                                callback(currentDbVersion);
                            });
                        });
                    }
                });
            });
        },
        copyDatabaseToSdCard: function(){
            if(!ionic.Platform.isAndroid()){
                console.log("copyDatabaseToSdCard only work in android!");
                return;
            }
            $cordovaFile.copyDir(cordova.file.applicationStorageDirectory, "databases", cordova.file.externalRootDirectory, "guestar_databases")
                .then(function (success) {
                    console.log("copyDatabaseToSdCard success: "+$filter('json')(success));
                }, function (error) {
                    console.log("copyDatabaseToSdCard error: "+$filter('json')(error));
                });
        }
    };
    return sqlManager;
});