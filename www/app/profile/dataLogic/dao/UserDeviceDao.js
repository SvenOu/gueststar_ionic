app.factory('UserDeviceDao', function (sqlManager) {
    var TABLE_NAME_USER_DEVICE = "user_device";
    var UserDeviceDao = {
        insert: function (userDevice) {
            var sql = "INSERT INTO " + TABLE_NAME_USER_DEVICE + " (profile_id,app_id,app_version,app_version_number,carrier_name,country,device_name," +
                    "language,mcc,mnc,model,network,system_name,system_version) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                params = [
                    userDevice.profileId,
                    userDevice.appId,
                    userDevice.appVersion,
                    userDevice.appVersionNumber,
                    userDevice.carrierName,
                    userDevice.country,
                    userDevice.deviceName,
                    userDevice.language,
                    userDevice.mcc,
                    userDevice.mnc,
                    userDevice.model,
                    userDevice.network,
                    userDevice.systemName,
                    userDevice.systemVersion
                ];
            return sqlManager.execute(sql, params, "UserDeviceDao.insert");
        },
        update: function (userDevice) {
            var sql = "UPDATE "+TABLE_NAME_USER_DEVICE+" SET app_id = ?, app_version = ?, app_version_number = ?, carrier_name = ?, country = ?," +
                    " device_name = ?, language = ?, mcc = ?, mnc = ?, model = ?, network = ?, system_name = ?, system_version = ? " +
                    " WHERE profile_id = ?",
                params = [
                    userDevice.appId,
                    userDevice.appVersion,
                    userDevice.appVersionNumber,
                    userDevice.carrierName,
                    userDevice.country,
                    userDevice.deviceName,
                    userDevice.language,
                    userDevice.mcc,
                    userDevice.mnc,
                    userDevice.model,
                    userDevice.network,
                    userDevice.systemName,
                    userDevice.systemVersion,
                    userDevice.profileId
                ];
            return sqlManager.execute(sql, params, "UserDeviceDao.update");
        },
        findByKey: function (profileId) {
            var sql = "SELECT * FROM "+TABLE_NAME_USER_DEVICE+" WHERE profile_id = ?",
                params = [
                    profileId
                ];
            return sqlManager.execute(sql, params, "UserDeviceDao.findByKey");
        },
        updateField: function (profileId, field, value) {
            var sql = "UPDATE " + TABLE_NAME_USER_DEVICE + " SET " + field + " = '" + value + "' WHERE profile_id = ?",
                params = [
                    profileId
                ];
            return sqlManager.execute(sql, params, "UserDeviceDao.updateField");
        },
        delete: function (profileId) {
            var sql = "DELETE FROM " + TABLE_NAME_USER_DEVICE + " WHERE profile_id = ?",
                params = [
                    profileId
                ];
            return sqlManager.execute(sql, params, "UserDeviceDao.delete");
        },
        //测试模块
        test: function () {
            console.log("----begin UserDeviceDao.test()----");
            var userDevice = {
                profileId: 1,
                appId: 2,
                appVersion: 3,
                appVersionNumber: 4,
                carrierName: 5,
                country: 6,
                deviceName: 7,
                language: 8,
                mcc: 9,
                mnc: 10,
                model: 11,
                network: 12,
                systemName: 13,
                systemVersion: 14
            };
            var userDevice_2 = {
                profileId: 11,
                appId: 22,
                appVersion: 33,
                appVersionNumber: 44,
                carrierName: 55,
                country: 66,
                deviceName: 77,
                language: 88,
                mcc: 99,
                mnc: 100,
                model: 110,
                network: 120,
                systemName: 130,
                systemVersion: 140
            };
            UserDeviceDao.insert(userDevice).then(function (res) {
                UserDeviceDao.update(userDevice).then(function (res) {
                    UserDeviceDao.updateField(userDevice.profileId, 'app_id', '1234568').then(function (res) {
                        UserDeviceDao.findByKey(userDevice.profileId).then(function (res) {
                            UserDeviceDao.delete(userDevice.profileId).then(function (res) {
                                console.log("----end UserDeviceDao.test()----");
                            });
                        });
                    });
                });
            });
        }
    };
    return UserDeviceDao;
});