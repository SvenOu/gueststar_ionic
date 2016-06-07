app.factory('ProfileDao', function (sqlManager) {
    var TABLE_NAME_USER_PROFILE = "user_profile";
    var ProfileDao = {
        insert: function (userProfile) {
            var sql = "INSERT INTO " + TABLE_NAME_USER_PROFILE +
                    " (profile_id,password,email,phone,first_name,last_name,gender,age,favorites,day_part,create_date," +
                    "device_type,device_system,app_id,app_version,language_code,dob,register_date,last_login_time,active,zip) " +
                    " VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",//字段frequency被省略
                params = [
                    userProfile.profileId,
                    userProfile.password,
                    userProfile.email,
                    userProfile.phone,
                    userProfile.firstName,
                    userProfile.lastName,
                    userProfile.gender,
                    userProfile.age,
                    userProfile.favorites,
                    userProfile.dayPart,
                    userProfile.createDate,
                    userProfile.deviceType,
                    userProfile.deviceSystem,
                    userProfile.appId,
                    userProfile.appVersion,
                    userProfile.languageCode,
                    userProfile.dob,
                    userProfile.registerDate,
                    userProfile.lastLoginTime,
                    userProfile.active,
                    userProfile.zip
                ];
            return sqlManager.execute(sql, params, "ProfileDao.insert");
        },
        update: function (userProfile) {
            var sql = "UPDATE " + TABLE_NAME_USER_PROFILE + " SET password =?,email = ?, phone = ?, first_name = ?,last_name = ? ," + "gender = ?," +
                    "age = ?, favorites = ?, day_part = ?,create_date = ?,device_type = ?, device_system = ?, app_id = ?," +
                    " app_version = ?,language_code = ?,dob = ?,register_date = ?, last_login_time = ?,active = ?,zip = ? " +
                    " WHERE profile_id = ?",
                params = [
                    userProfile.password,
                    userProfile.email,
                    userProfile.phone,
                    userProfile.firstName,
                    userProfile.lastName,
                    userProfile.gender,
                    userProfile.age,
                    userProfile.favorites,
                    userProfile.dayPart,
                    userProfile.createDate,
                    userProfile.deviceType,
                    userProfile.deviceSystem,
                    userProfile.appId,
                    userProfile.appVersion,
                    userProfile.languageCode,
                    userProfile.dob,
                    userProfile.registerDate,
                    userProfile.lastLoginTime,
                    userProfile.active,
                    userProfile.zip,
                    userProfile.profileId
                ];
            return sqlManager.execute(sql, params, "ProfileDao.update");
        },
        findUserProfile: function () {
            var sql = "SELECT * FROM " + TABLE_NAME_USER_PROFILE + " LIMIT 0, 1",
                params = null;
            return sqlManager.execute(sql, params, "ProfileDao.findByProfileId");
        },
        updateField: function (profileId, field, value) {
            var sql = "UPDATE " + TABLE_NAME_USER_PROFILE + " SET " + field + " = '" + value + "' WHERE profile_id = ?",
                params = [
                    profileId
                ];
            return sqlManager.execute(sql, params, "ProfileDao.updateField");
        },
        delete: function (profileId) {
            var sql =
                    "DELETE FROM " + TABLE_NAME_USER_PROFILE + " WHERE profile_id = ?",
                params = [
                    profileId
                ];
            return sqlManager.execute(sql, params, "ProfileDao.delete");
        },
        //测试模块
        test: function () {
            console.log("----begin ProfileDao.test()----");
            var userProfile = {
                profileId: 1,
                password: 2,
                email: 3,
                phone: 4,
                firstName: 5,
                lastName: 6,
                gender: 7,
                age: 8,
                favorites: 9,
                dayPart: 10,
                createDate: 11,
                deviceType: 12,
                deviceSystem: 13,
                appId: 14,
                appVersion: 15,
                languageCode: 16,
                dob: 17,
                registerDate: 18,
                lastLoginTime: 19,
                active: 20,
                zip: 21
            };
            var userProfile_2 = {
                profileId: 1,
                password: 22,
                email: 33,
                phone: 44,
                firstName: 55,
                lastName: 66,
                gender: 77,
                age: 88,
                favorites: 99,
                dayPart: 100,
                createDate: 110,
                deviceType: 120,
                deviceSystem: 130,
                appId: 140,
                appVersion: 150,
                languageCode: 160,
                dob: 170,
                registerDate: 180,
                lastLoginTime: 190,
                active: 200,
                zip: 210
            };
            ProfileDao.insert(userProfile).then(function (res) {
                ProfileDao.update(userProfile_2).then(function (res) {
                    ProfileDao.updateField(userProfile.profileId, 'first_name', '1234568').then(function (res) {
                        ProfileDao.findUserProfile().then(function (res) {
                            ProfileDao.delete(userProfile.profileId).then(function (res) {
                                console.log("----end ProfileDao.test()----");
                            });
                        });
                    });
                });
            });
        }
    };
    return ProfileDao;
});