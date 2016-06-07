app.factory('SyncDataDao', function (sqlManager) {
    var SYNC_DATA_TABEL_NAME = "sync_data";
    var  INIT= "init", UPLOADING ="uploading", FINISH ="finished";
    var SyncDataDao = {
        insert: function (syncData) {
            var sql = "INSERT INTO sync_data (sync_id, type, data_id, data, format, status, create_date) VALUES (?,?,?,?,?,?,?)",
                params = [
                    syncData.syncId,
                    syncData.type,
                    syncData.dataId,
                    syncData.data,
                    syncData.format,
                    syncData.status,
                    syncData.createDate
                ];
            return sqlManager.execute(sql, params, "SyncDataDao.insert");
        },
        update: function (syncData) {
            var sql = "UPDATE sync_data SET type = ?,data_id = ?, data = ?, format = ?, status = ?, create_date = ?  WHERE  sync_id = ?",
                params = [
                    syncData.type,
                    syncData.dataId,
                    syncData.data,
                    syncData.format,
                    syncData.status,
                    syncData.createDate,
                    syncData.syncId
                ];
            return sqlManager.execute(sql, params, "SyncDataDao.update");
        },
        deleteById: function (syncId) {
            var sql = "DELETE FROM sync_data WHERE sync_id = ?" ,
                params = [
                    syncId
                ];
            return sqlManager.execute(sql, params, "SyncDataDao.deleteById");
        },
        findInitSyncData: function () {
            var sql = "SELECT * FROM sync_data WHERE status = 'init' ORDER BY create_date ASC LIMIT 10" ,
                params = null;
            return sqlManager.execute(sql, params, "SyncDataDao.findInitSyncData");
        },
        findByDataId: function (dataId) {
            var sql = "SELECT * FROM sync_data WHERE data_id = ? LIMIT 1" ,
                params = [
                    dataId
                ];
            return sqlManager.execute(sql, params, "SyncDataDao.findByDataId");
        },
        findByType: function (type) {
            var sql = "SELECT * FROM sync_data WHERE type = ? LIMIT 1" ,
                params = [
                    type
                ];
            return sqlManager.execute(sql, params, "SyncDataDao.findByType");
        },
        updateAllSyncDataStatus: function (status) {
            var sql = "UPDATE sync_data SET status = ?" ,
                params = [
                    status
                ];
            return sqlManager.execute(sql, params, "SyncDataDao.updateAllSyncDataStatus");
        },
        updateField: function (syncId,field,value) {
            var sql = "UPDATE sync_data SET "+field+" = '"+value+"' WHERE  sync_id = ?" ,
                params = [
                    syncId
                ];
            return sqlManager.execute(sql, params, "SyncDataDao.updateField");
        },
        updateStatusToInitForUploading: function () {
            var sql = "UPDATE sync_data SET status = ?  WHERE  status = ?" ,
                params = [
                    INIT,
                    UPLOADING
                ];
            return sqlManager.execute(sql, params, "SyncDataDao.updateStatusToInitForUploading");
        },
        //测试模块
        test: function () {
            console.log("----begin SyncDataDao.test()----");
            var syncData = {
                syncId: 1,
                type: 2,
                dataId: 3,
                data: 4,
                format: 5,
                status: 6,
                createDate: 7
            };
            var syncData_2 = {
                syncId: 1,
                type: 22,
                dataId: 33,
                data:44,
                format: 55,
                status: 66,
                createDate: 77
            };

            SyncDataDao.insert(syncData).then(function (res) {
                SyncDataDao.update(syncData_2).then(function (res) {
                    SyncDataDao.updateAllSyncDataStatus(666666).then(function (res) {
                        SyncDataDao.updateField(syncData.syncId,"data_id","333333").then(function (res) {
                            SyncDataDao.updateStatusToInitForUploading().then(function (res) {
                                SyncDataDao.findInitSyncData().then(function (res) {
                                    SyncDataDao.findByDataId("333333").then(function (res) {
                                        SyncDataDao.findByType(22).then(function (res) {
                                            SyncDataDao.deleteById(1).then(function (res) {
                                                console.log("----end SyncDataDao.test()----");
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    };
    return SyncDataDao;
});