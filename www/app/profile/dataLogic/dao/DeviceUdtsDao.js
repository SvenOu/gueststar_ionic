app.factory('DeviceUdtsDao', function (sqlManager) {
    var DEVICE_UDTS_TABLE_NAME = "device_udts";
    var DeviceUdtsDao = {
        insert: function (deviceUdts) {
            var sql = "INSERT INTO " + DEVICE_UDTS_TABLE_NAME + " (device_token,data_type,profile_id,udts,update_date)  VALUES(?,?,?,?,?)",
                params = [
                    deviceUdts.deviceToken,
                    deviceUdts.dataType,
                    deviceUdts.profileId,
                    deviceUdts.udts,
                    deviceUdts.updateDate
                ];
            return sqlManager.execute(sql, params, "DeviceUdtsDao.insert");
        },
        findByDeviceToken: function (deviceToken) {
            var sql = "SELECT * FROM " + DEVICE_UDTS_TABLE_NAME + " WHERE device_token = ? LIMIT 1",
                params = [
                    deviceToken
                ];
            return sqlManager.execute(sql, params, "DeviceUdtsDao.findByDeviceToken");
        },
        findByProfileId: function (profileId) {
            var sql =
                    "SELECT * FROM device_udts WHERE profile_id = ? LIMIT 1",
                params = [
                    profileId
                ];
            return sqlManager.execute(sql, params, "DeviceUdtsDao.findByProfileId");

        },
        updateField: function (profileId, field, value) {
            var sql =
                    "UPDATE " + DEVICE_UDTS_TABLE_NAME + " SET " + field + " = '" + value + "' WHERE profile_id = ?",
                params = [
                    profileId
                ];
            return sqlManager.execute(sql, params, "DeviceUdtsDao.updateField");
        },
        deleteByProfileId: function (profileId) {
            var sql =
                    "DELETE FROM " + DEVICE_UDTS_TABLE_NAME + " WHERE profile_id = ?",
                params = [
                    profileId
                ];
            return sqlManager.execute(sql, params, "DeviceUdtsDao.deleteByProfileId");
        },
        //测试模块
        test: function () {
            console.log("----begin DeviceUdtsDao.test()----");
            var deviceUdts = {
                deviceToken: 1,
                dataType: 2,
                profileId: 3,
                udts: 4,
                updateDate: 5
            };
            DeviceUdtsDao.insert(deviceUdts).then(function (res) {
                DeviceUdtsDao.findByDeviceToken(deviceUdts.deviceToken).then(function (res) {
                    DeviceUdtsDao.updateField(deviceUdts.profileId, 'device_token', '1234583').then(function (res) {
                        DeviceUdtsDao.findByProfileId(deviceUdts.profileId).then(function (res) {
                            DeviceUdtsDao.deleteByProfileId(deviceUdts.profileId).then(function (res) {
                                console.log("----end DeviceUdtsDao.test()----");
                            });
                        });
                    });
                });
            });
        }
    };
    return DeviceUdtsDao;
});