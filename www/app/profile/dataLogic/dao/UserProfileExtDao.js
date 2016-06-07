app.factory('UserProfileExtDao', function (sqlManager) {
    var TABLE_NAME_USER_PROFILE_EXT = "user_profile_ext";
    var UserProfileExtDao = {
        findAllByProfileId: function (profileId) {
            var sql = "SELECT * FROM "+TABLE_NAME_USER_PROFILE_EXT+" WHERE profile_id = ?" ,
                params = [
                    profileId
                ];
            return sqlManager.execute(sql, params, "UserProfileExtDao.findAllByProfileId");
        },
        findByKey: function (profileId, paramId) {
            var sql = "SELECT * FROM "+TABLE_NAME_USER_PROFILE_EXT+" WHERE profile_id = ? AND param_id = ?",
                params = [
                    profileId,
                    paramId
                ];
            return sqlManager.execute(sql, params, "UserProfileExtDao.findByKey");
        },
        batchUpdateParamValue: function (userProfileExts,finishCallback) {
            var results = [], i = 0, length = userProfileExts.length;
            var callbck = function (res) {
                if(res){
                    i++;
                    results[i] = res.rows.item(0);
                }
                if(length > 0 && i < length){
                    var userProfileExt = userProfileExts[i];
                    UserProfileExtDao.updateField(userProfileExt.profileId, userProfileExt.paramId,
                        "param_value", userProfileExt.paramValue).then(callbck);
                }else{
                    if('function' == typeof(finishCallback)) finishCallback(results);
                }
            };
            callbck();
        },
        updateField: function (profileId, paramId, field, value) {
            var sql = "UPDATE " + TABLE_NAME_USER_PROFILE_EXT + " SET " + field + " = '" + value + "' WHERE profile_id = ? AND param_id = ?",
                params = [
                    profileId,
                    paramId
                ];
            return sqlManager.execute(sql, params, "UserProfileExtDao.updateField");
        },
        initByProfileId: function (profileId) {
            var sql = "INSERT INTO "+TABLE_NAME_USER_PROFILE_EXT+" (profile_id, param_id, param_name, param_value, enabled)"+
                    " SELECT '"+profileId+"', param_id,param_name,param_value,enabled FROM user_profile_ext"+
                    " WHERE profile_id = 'TEMPLATE' AND param_id NOT IN (SELECT param_id FROM user_profile_ext "+
                    "WHERE profile_id = '"+profileId+"')",
                params = null;
            return sqlManager.execute(sql, params, "UserProfileExtDao.initByProfileId");
        },
        findUninitedCountByProfileId: function (profileId) {//弃用
            var sql = "",
                params = [];
            return sqlManager.execute(sql, params, "UserProfileExtDao.findUninitedCountByProfileId");
        },
        updateFrequencyToVisitFreq: function (profileId) {
            var sql = "UPDATE user_profile_ext " +
                "SET param_value = " +
                "	(" +
                "		SELECT frequency " +
                "		FROM user_profile " +
                "		WHERE profile_id = ?" +
                "	) " +
                "WHERE profile_id = ? " +
                "	AND param_id = 'UP000001'",
                params = [
                    profileId,
                    profileId
                ];
            return sqlManager.execute(sql, params, "UserProfileExtDao.updateFrequencyToVisitFreq");
        },
        //测试模块
        test: function () {
            var profileId = 'cde73d0f7e304ff7a1331fbaf574d910';
            var userProfileExts = [
                {
                    profileId: profileId,
                    paramId: 'UP000001',
                    paramValue: 'UP000001 new test Value'
                },
                {
                    profileId: profileId,
                    paramId: 'UP000002',
                    paramValue: 'UP000002 new test Value'
                },
                {
                    profileId: profileId,
                    paramId: 'UP000003',
                    paramValue: 'UP000003 new test Value'
                }
            ];

            console.log("----begin UserProfileExtDao.test()----");
            UserProfileExtDao.initByProfileId(profileId).then(function (res) {
                UserProfileExtDao.findAllByProfileId(profileId).then(function (res) {
                    UserProfileExtDao.batchUpdateParamValue(userProfileExts, function (res) {
                        UserProfileExtDao.findByKey(profileId,'UP000002').then(function (res) {
                            UserProfileExtDao.updateFrequencyToVisitFreq(profileId).then(function (res) {
                                console.log("----end UserProfileExtDao.test()----");
                            });
                        });
                    });
                });
            });
        }
    };
    return UserProfileExtDao;
});